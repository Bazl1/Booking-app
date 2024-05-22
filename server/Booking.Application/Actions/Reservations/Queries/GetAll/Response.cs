using Booking.Application.Dtos;

namespace Booking.Application.Actions.Reservations.Queries.GetAll;

public record Response (IEnumerable<ReservationDto> Reservations);
