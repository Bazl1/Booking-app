using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetAll;

public record Request(
    int Page,
    int Limit
) : IRequest<Response>
{
    public string? Query { get; set; } = null;
    public string? UserId { get; set; } = null;
    public string? CategoryId { get; set; } = null;

};