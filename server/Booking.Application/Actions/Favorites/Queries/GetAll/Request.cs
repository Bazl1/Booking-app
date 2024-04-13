using MediatR;

namespace Booking.Application.Actions.Favorites.Queries.GetAll;

public record Request() : IRequest<Response>;