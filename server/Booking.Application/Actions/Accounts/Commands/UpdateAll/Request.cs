using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Accounts.Commands.UpdateAll;

public record Request(
    string Name,
    string PhoneNumber,
    IFormFile Avatar
) : IRequest<Response>
{
    public string Id { get; init; }
};