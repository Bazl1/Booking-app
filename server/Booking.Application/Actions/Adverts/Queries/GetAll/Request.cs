using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetAll;

public record Request(
    int? Page,
    int? Limit,
    string? Query,
    string? UserId,
    string? CategoryId
) : IRequest<Response>;