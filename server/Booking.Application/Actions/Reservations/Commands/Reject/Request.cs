using MediatR;

namespace Booking.Application.Actions.Reservations.Commands.Reject;

public record Request(string id) : IRequest;