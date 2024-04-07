namespace Booking.Application.Actions.Adverts.Queries.GetReservationDates;

public record Response(
    IEnumerable<string> Dates
);