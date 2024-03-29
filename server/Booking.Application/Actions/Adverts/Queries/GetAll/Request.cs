using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetAll;

public record Request(
    int Page,
    int Limit
) : IRequest<Response>
{
    public string? Query { get; set; } = null;
};