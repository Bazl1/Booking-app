using System.Security.Claims;
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
    IRequestHandler<GetReservationDates.Request, GetReservationDates.Response>
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
        
        var author = new UserDto
        {
            Id = Guid.NewGuid().ToString(),
            Avatar = "",
            Name = "Cyril",
            Initials = "Cy",
            Email = "cyril@morozov.com",
            PhoneNumber = "+380000000000"
        };
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
        if (request.Page < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Page must be greater than 0"
            );
        if (request.Limit < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Limit must be greater than 0"
            );

        var adverts = unitOfWork.Adverts.Search(request.Query, request.UserId).ToList();

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                adverts
                    .Skip((request.Page - 1) * request.Limit)
                    .Take(request.Limit),
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
            (int)Math.Ceiling((double)adverts.Count / (double)request.Limit)
        );
    }

    public async Task<GetReservationDates.Response> Handle(GetReservationDates.Request request, CancellationToken cancellationToken)
    {
        var startDate = new DateOnly(
            year: request.Year,
            month: request.Month,
            day: 1
        );
        var endDate = new DateOnly(
            year: request.Year,
            month: request.Month,
            day: DateTime.DaysInMonth(request.Year, request.Month)
        );
        var reservations = unitOfWork.Reservations.GetByAdvertId(advertId: request.Id, start: startDate, end: endDate);
        List<string> dates = new();
        for (var curDate = startDate; curDate <= endDate; curDate = curDate.AddDays(1))
            if (reservations.Any(r => r.StartDate <= curDate && curDate <= r.EndDate))
                dates.Add(curDate.ToString("dd'/'MM'/'yy"));
        return new(dates);
    }
}