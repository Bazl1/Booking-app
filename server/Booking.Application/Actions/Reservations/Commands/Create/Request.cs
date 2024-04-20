using MediatR;

namespace Booking.Application.Actions.Reservations.Commands.Create;

public record Request(
    string AdvertId,
    string StartDate,
    string EndDate,
    int NumberOfAdults,
    int NumberOfChildren,
    float Cost,
    bool Pets
) : IRequest
{

};