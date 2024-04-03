using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetReservationDates;

public record Request(
    string Id,
    string StartDate,
    string EndDate
) : IRequest<Response>;