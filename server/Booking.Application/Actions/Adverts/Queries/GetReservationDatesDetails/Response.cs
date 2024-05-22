using Booking.Application.Dtos;

namespace Booking.Application.Actions.Adverts.Queries.GetReservationDatesDetails;

public record Response(
    IEnumerable<ReservationDateDto> Dates
);