using Booking.Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Commands.Create;

public record Request(
    string Name,
    string Description,
    float PricePerNight,
    int NumberOfRooms,
    int NumberOfSingleBeds,
    int NumberOfDoubleBeds,
    bool Wifi,
    bool PetsAllowed,
    bool TV,
    bool Refrigerator,
    bool Kitchen,
    bool Washer,
    bool Heating,
    bool Dryer,
    IFormFileCollection Photos,
    IEnumerable<string> Categories
) : IRequest<AdvertDto>;