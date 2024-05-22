using MediatR;

namespace Booking.Application.Actions.Accounts.Queries.GetById;

public record Request(string Id) : IRequest<Response>;