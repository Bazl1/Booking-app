using MediatR;

namespace Booking.Application.Actions.Accounts.Commands.UpdatePassword;

public record Request(
    string Password,
    string NewPassword
) : IRequest;