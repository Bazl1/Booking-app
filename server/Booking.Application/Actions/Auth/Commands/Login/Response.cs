using Booking.Application.Dtos;

namespace Booking.Application.Actions.Auth.Commands.Login;

public record Response(
    UserDto User,
    string AccessToken,
    string RefreshToken
);