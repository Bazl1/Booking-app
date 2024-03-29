using Booking.Application.Dtos;

namespace Booking.Application.Actions.Adverts.Queries.GetAll;

public record Response(
    IEnumerable<AdvertDto> Adverts,
    int PageCount
);