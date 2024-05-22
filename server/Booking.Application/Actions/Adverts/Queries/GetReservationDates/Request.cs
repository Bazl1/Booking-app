using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetReservationDates;

public record Request(
    string Id,
    int Month,
    int Year
) : IRequest<Response>;