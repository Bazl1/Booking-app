using MediatR;

namespace Booking.Application.Actions.Reservations.Commands.Create;

public record Request(
    string AdvertId,
    DateOnly StartDate,
    DateOnly EndDate,
    int NumberOfAdults,
    int NumberOfChildren,
    bool Pets
) : IRequest
{
};