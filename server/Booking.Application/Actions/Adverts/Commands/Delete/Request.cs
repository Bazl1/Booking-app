using MediatR;

namespace Booking.Application.Actions.Adverts.Commands.Delete;

public record Request(
    string Id
) : IRequest;