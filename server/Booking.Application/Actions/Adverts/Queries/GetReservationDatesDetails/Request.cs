using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetReservationDatesDetails;

public record Request(
    string Id,
    int Month,
    int Year
) : IRequest<Response>;