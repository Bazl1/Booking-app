using MediatR;

namespace Booking.Application.Actions.Accounts.Commands.Update;

public record Request(
    string? Name = null,
    string? PhoneNumber = null
) : IRequest<Response>
{
    public string Id { get; init; }
};