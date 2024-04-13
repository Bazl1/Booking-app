using MediatR;

namespace Booking.Application.Actions.Adverts.Commands.Like;

public record Request(string Id) : IRequest<Response>;