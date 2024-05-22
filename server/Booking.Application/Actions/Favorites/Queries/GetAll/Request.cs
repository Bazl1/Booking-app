using MediatR;

namespace Booking.Application.Actions.Favorites.Queries.GetAll;

public record Request(
    int Limit,
    int Page
) : IRequest<Response>;