using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Accounts.Commands.UpdateAvatar;

public record Request(
    IFormFile Avatar
) : IRequest<Response>;