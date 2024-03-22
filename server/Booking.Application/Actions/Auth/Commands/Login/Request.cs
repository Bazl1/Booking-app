using MediatR;

namespace Booking.Application.Actions.Auth.Commands.Login;

public record Request(
    string Email,
    string Password
) : IRequest<Response>;