using Booking.Application.Dtos;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Commands.Update;

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
    IEnumerable<string> Categories,
    IEnumerable<string> Urls,
    IFormFileCollection? Photos = null
) : IRequest<AdvertDto>
{
    public string? Id { get; set; } = null;
}