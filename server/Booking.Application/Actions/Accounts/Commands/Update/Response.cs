using Booking.Application.Dtos;

namespace Booking.Application.Actions.Accounts.Commands.Update;

public record Response(
    UserDto User
);