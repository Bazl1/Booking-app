
using Booking.Application.Dtos;

namespace Booking.Application.Actions.Adverts.Queries.GetById;

public record Response(
    string Id,
    string Name,
    string Description,
    UserDto? Owner,
    decimal PricePerNight,
    int NumberOfBathrooms,
    int NumberOfSingleBeds,
    int NumberOfDoubleBeds,
    int MaxPeople,
    Amenities Amenities,
    List<string> Photos,
    List<ReviewDto> Reviews,
    CategoryDto Category,
    int Rating,
    bool Liked
);