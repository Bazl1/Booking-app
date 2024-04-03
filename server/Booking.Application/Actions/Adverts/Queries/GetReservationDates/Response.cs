using Booking.Application.Dtos;

namespace Booking.Application.Actions.Adverts.Queries.GetReservationDates;

public record Response(
    IEnumerable<ReservedDateDto> Dates
);