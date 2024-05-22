using MediatR;

namespace Booking.Application.Actions.Accounts.Queries.GetAll;

public record Request() : IRequest<Response>;