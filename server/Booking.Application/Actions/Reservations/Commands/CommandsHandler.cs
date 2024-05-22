using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Booking.Application.Actions.Reservations.Commands;

internal class CommandsHandler(
    IUnitOfWork unitOfWork,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<Create.Request>,
    IRequestHandler<Accept.Request>,
    IRequestHandler<Reject.Request>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public Task Handle(Create.Request request, CancellationToken cancellationToken)
    {
        var userId = Context?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        if (!DateOnly.TryParseExact(s: request.StartDate, format: "dd/MM/yyyy", result: out DateOnly startDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid start date"
            );

        if (!DateOnly.TryParseExact(s: request.EndDate, format: "dd/MM/yyyy", result: out DateOnly endDate))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid end date"
            );

        if (startDate >= endDate)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "The start date cannot be earlier than the end date"
            );

        if (request.NumberOfAdults + request.NumberOfChildren == 0)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "The number of guests cannot be equal to zero"
            );

        if (unitOfWork.Adverts.GetById(request.AdvertId) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Adver with given id is not found"
            );

        if (unitOfWork.Reservations.GetByAdvertId(advert.Id, start: startDate, end: endDate).Any())
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                $"Date has already been booked"
            );

        var reservation = Reservation.Create(
            user,
            advert,
            startDate,
            endDate,
            request.NumberOfAdults,
            request.NumberOfChildren,
            request.Pets,
            request.Cost
        );

        unitOfWork.Reservations.Create(reservation);
        unitOfWork.SaveChanges();

        return Task.CompletedTask;
    }

    public Task Handle(Accept.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Reservations.GetById(request.id) is not Reservation reservation)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Reservation request with given id is not found"
            );

        if (reservation.Status == Core.Enums.ReservationStatus.Accepted)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Reservation has already been confirmed"
            );

        if (reservation.Status == Core.Enums.ReservationStatus.Rejected)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Reservation has already been canceled"
            );

        reservation.Status = Core.Enums.ReservationStatus.Accepted;
        unitOfWork.SaveChanges();

        return Task.CompletedTask;
    }

    public Task Handle(Reject.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Reservations.GetById(request.id) is not Reservation reservation)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Reservation request with given id is not found"
            );

        if (reservation.Status == Core.Enums.ReservationStatus.Accepted)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Reservation has already been confirmed"
            );

        if (reservation.Status == Core.Enums.ReservationStatus.Rejected)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Reservation has already been canceled"
            );

        reservation.Status = Core.Enums.ReservationStatus.Rejected;
        unitOfWork.SaveChanges();

        return Task.CompletedTask;
    }
}