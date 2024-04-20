using MediatR;

namespace Booking.Application.Actions.Reservations.Commands.Accept;

public record Request(string id) : IRequest;
