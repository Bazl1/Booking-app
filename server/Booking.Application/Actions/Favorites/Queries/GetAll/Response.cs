using Booking.Application.Dtos;

namespace Booking.Application.Actions.Favorites.Queries.GetAll;

public record Response(
    IEnumerable<AdvertDto> Favorites
);