using MediatR;

namespace Booking.Application.Actions.Auth.Commands.Refresh;

public record Request() : IRequest<Response>;