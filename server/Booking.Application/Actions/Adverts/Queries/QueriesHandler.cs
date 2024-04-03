using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Queries;

public class QueriesHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetById.Request, AdvertDto>,
    IRequestHandler<GetAll.Request, GetAll.Response>,
    IRequestHandler<GetReservationDates.Request, GetReservationDates.Response>
{
    public HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<AdvertDto> Handle(GetById.Request request, CancellationToken cancellationToken)
    {
        return mapper.Map<AdvertDto>(
            unitOfWork.Adverts.GetById(request.Id),
            opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"
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
        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                adverts
                    .Skip((request.Page - 1) * request.Limit)
                    .Take(request.Limit),
                opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"
            ),
            (int)Math.Ceiling((double)adverts.Count / (double)request.Limit)
        );
    }

    public async Task<GetReservationDates.Response> Handle(GetReservationDates.Request request, CancellationToken cancellationToken)
    {
        if (!DateOnly.TryParse(request.StartDate, out DateOnly startDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid start data"
            );

        if (!DateOnly.TryParse(request.EndDate, out DateOnly endDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid end data"
            );

        if (endDate <= startDate)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "The end date cannot be earlier than the start date"
            );

        var reservations = unitOfWork.Reservations.GetByAdvertId(advertId: request.Id, start: startDate, end: endDate);
        List<ReservedDateDto> dates = new();
        for (var curDate = startDate; curDate <= endDate; curDate.AddDays(1))
        {
            dates.Add(new()
            {
                Date = curDate,
                Reserved = reservations.Any(r => r.StartDate <= curDate && curDate <= r.EndDate),
            });
        }
        return new(dates);
    }
}