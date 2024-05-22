using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetAll;

public record Request(
    int? Page,
    int? Limit,
    string? UserId,
    string? CategoryId,
    string? Query,
    string? StartDate,
    string? EndDate,
    int? MinCost,
    int? MaxCost,
    int? SingleBeds,
    int? DoubleBeds,
    bool? Wifi, 
    bool? PetsAllowed,
    bool? TV,
    bool? Refrigerator,
    bool? Kitchen,
    bool? Washer,
    bool? Heating,
    bool? Dryer
) : IRequest<Response>;