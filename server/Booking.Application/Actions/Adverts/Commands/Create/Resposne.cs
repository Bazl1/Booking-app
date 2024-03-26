using Booking.Application.Dtos;

namespace Booking.Application.Actions.Adverts.Commands.Create;

public record Response(
    AdvertDto Advert
);