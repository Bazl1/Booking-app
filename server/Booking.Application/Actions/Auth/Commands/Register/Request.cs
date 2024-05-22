using MediatR;

namespace Booking.Application.Actions.Auth.Commands.Register;

public record Request(
    string Name,
    string Email,
    string PhoneNumber,
    string Password
) : IRequest<Response>;