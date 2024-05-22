using Booking.Application.Dtos;

namespace Booking.Application.Actions.Accounts.Queries.GetById;

public record Response(
    UserDto User
);