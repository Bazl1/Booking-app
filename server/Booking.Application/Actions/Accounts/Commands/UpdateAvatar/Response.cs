using Booking.Application.Dtos;

namespace Booking.Application.Actions.Accounts.Commands.UpdateAvatar;

public record Response(
    UserDto User
);