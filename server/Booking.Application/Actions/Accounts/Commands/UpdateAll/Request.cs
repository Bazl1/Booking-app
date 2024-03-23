using MediatR;

namespace Booking.Application.Actions.Accounts.Commands.UpdateAll;

public record Request(
    string Name,
    string PhoneNumber
) : IRequest<Response>
{
    public string Id { get; init; }
};