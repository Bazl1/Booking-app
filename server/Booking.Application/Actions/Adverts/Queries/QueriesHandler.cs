﻿using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Queries;

public class QueriesHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetById.Request, GetById.Response>,
    IRequestHandler<GetAll.Request, GetAll.Response>,
    IRequestHandler<GetReservationDates.Request, GetReservationDates.Response>,
    IRequestHandler<GetReservationDatesDetails.Request, GetReservationDatesDetails.Response>
{
    public HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<GetById.Response> Handle(GetById.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Adverts.GetById(request.Id) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Advert with given id is not found"
            );

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        User? user = null;
        if (userId != null)
            user = unitOfWork.Users.GetById(userId);
        
        var reviews = unitOfWork.Reviews.GetByAdvertId(advert.Id);
        return new(
            advert.Id,
            advert.Name,
            advert.Description,
            mapper.Map<UserDto>(advert.Owner, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"),
            advert.PricePerNight,
            advert.NumberOfBathrooms,
            advert.NumberOfSingleBeds,
            advert.NumberOfDoubleBeds,
            advert.MaxPeople,
            new Amenities
            {
                Wifi = advert.Wifi,
                PetsAllowed = advert.PetsAllowed,
                TV = advert.TV,
                Refrigerator = advert.Refrigerator,
                Kitchen = advert.Kitchen,
                Washer = advert.Washer,
                Heating = advert.Heating,
                Dryer = advert.Dryer
            },
            advert.Photos.Select(photo => $"{Context.Request.Scheme}://{Context.Request.Host}/{photo}").ToList(),
            mapper.Map<List<ReviewDto>>(
                reviews,
                opt =>
                {
                    opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
                }
            ),
            mapper.Map<CategoryDto>(advert.Category),
            0,
            user != null ? user.Likes.Any(a => a.Id == advert.Id) : false
        );
    }

    public async Task<GetAll.Response> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        if (request.Page != null && request.Page < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Page must be greater than 0"
            );
        if (request.Page != null && request.Limit < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Limit must be greater than 0"
            );
        DateOnly startDate = default;
        if (request.StartDate != null && !DateOnly.TryParseExact(request.StartDate, "dd'/'MM'/'yyyy", out startDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid start date query param"
            );
        DateOnly endDate = default;
        if (request.EndDate != null && !DateOnly.TryParseExact(request.EndDate, "dd'/'MM'/'yyyy", out endDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid start date query param"
            );

        List<Advert> adverts = unitOfWork.Adverts.Search(
            request.Query,
            request.UserId,
            request.CategoryId,
            startDate == default ? null : startDate,
            endDate == default ? null : endDate,
            request.MinCost,
            request.MaxCost,
            request.SingleBeds,
            request.DoubleBeds,
            request.Wifi,
            request.PetsAllowed,
            request.TV,
            request.Refrigerator,
            request.Kitchen,
            request.Washer,
            request.Heating,
            request.Dryer
        ).ToList();
        if (request.Page != null && request.Limit != null) {
            adverts = adverts
                .Skip(((int)(request.Page) - 1) * (int)(request.Limit))
                .Take((int)request.Limit)
                .ToList();
        }

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                adverts,
                opt =>
                {
                    opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
                    if (userId != null)
                    {
                        var user = unitOfWork.Users.GetById(userId);
                        opt.Items["USER_LIKES"] = user.Likes;
                    }
                    else
                    {
                        opt.Items["USER_LIKES"] = new List<Advert>();
                    }
                }
            ),
            request.Limit != null ? (int)Math.Ceiling((double)adverts.Count / (double)request.Limit) : 0
        );
    }

    public async Task<GetReservationDates.Response> Handle(GetReservationDates.Request request, CancellationToken cancellationToken)
    {
        var startDate = new DateOnly(
            year: request.Year + (int)(request.Month / 12),
            month: request.Month % 12,
            day: 1
        );
        var endDate = new DateOnly(
            year: request.Year + (int)(request.Month / 12),
            month: request.Month % 12,
            day: DateTime.DaysInMonth(request.Year, request.Month)
        );
        var reservations = unitOfWork.Reservations.GetByAdvertId(advertId: request.Id, start: startDate, end: endDate);
        List<string> dates = new();
        for (var curDate = startDate; curDate <= endDate; curDate = curDate.AddDays(1))
            if (reservations.Any(r => r.StartDate <= curDate && curDate <= r.EndDate))
                dates.Add(curDate.ToString("dd'/'MM'/'yy"));
        return new(dates);
    }

    public async Task<GetReservationDatesDetails.Response> Handle(GetReservationDatesDetails.Request request, CancellationToken cancellationToken)
    {
        var startDate = new DateOnly(
            year: request.Year + (int)(request.Month / 12),
            month: request.Month % 12,
            day: 1
        );
        var endDate = new DateOnly(
            year: request.Year + (int)(request.Month / 12),
            month: request.Month % 12,
            day: DateTime.DaysInMonth(request.Year, request.Month)
        );
        var reservations = unitOfWork.Reservations.GetByAdvertId(advertId: request.Id, start: startDate, end: endDate);
        List<ReservationDateDto> dates = new();
        for (var curDate = startDate; curDate <= endDate; curDate = curDate.AddDays(1))
            if (reservations.FirstOrDefault(r => r.StartDate <= curDate && curDate <= r.EndDate) is Reservation reservation)
                dates.Add(new ReservationDateDto {
                    Date = curDate.ToString("dd'/'MM'/'yy"),
                    User = mapper.Map<UserDto>(
                        reservation.Author,
                        opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}")
                });
        return new(dates);
    }
}