using Booking.Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Commands.Create;

public record Request(
    string Name,
    string Description,
    float PricePerNight,
    int NumberOfBathrooms,
    int NumberOfSingleBeds,
    int NumberOfDoubleBeds,
    int MaxPeople,
    bool Wifi,
    bool PetsAllowed,
    bool TV,
    bool Refrigerator,
    bool Kitchen,
    bool Washer,
    bool Heating,
    bool Dryer,
    IEnumerable<string> Photos,
    string Category
) : IRequest<AdvertDto>;