using Booking.Core.Enums;
using MediatR;

namespace Booking.Application.Actions.Reservations.Queries.GetAll;

public record Request(ReservationType Type, ReservationStatus? Status) : IRequest<Response>;
