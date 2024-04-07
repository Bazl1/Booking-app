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
) : IRequestHandler<Create.Request>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task Handle(Create.Request request, CancellationToken cancellationToken)
    {
        var userId = Context?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        if (request.StartDate >= request.EndDate)
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

        var reservation = Reservation.Create(
            user,
            advert,
            request.StartDate,
            request.EndDate,
            request.NumberOfAdults,
            request.NumberOfChildren,
            request.Pets
        );

        unitOfWork.Reservations.Create(reservation);
        unitOfWork.SaveChanges();
    }
}