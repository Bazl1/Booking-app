using Booking.Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Accounts.Commands.Update;

public record Request(
    string? Name = null,
    string? PhoneNumber = null,
    IFormFile? Avatar = null
) : IRequest<UserDto>
{
    public string Id { get; init; }
};