using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Entities;

namespace Booking.Application.Profiles;

public class AdvertProfile : Profile
{
    public AdvertProfile()
    {
        CreateMap<Advert, AdvertDto>()
            .ForMember(dest => dest.Photos, opt => opt.MapFrom((src, dest, destMember, context) => src.Photos.Select(photo => $"{context.Items["BASE_URL"]}/{photo}")))
            .ForMember(dest => dest.Amenities, opt => opt.MapFrom(src => new Amenities
            {
                Wifi = src.Wifi,
                PetsAllowed = src.PetsAllowed,
                TV = src.TV,
                Refrigerator = src.Refrigerator,
                Kitchen = src.Kitchen,
                Washer = src.Washer,
                Heating = src.Heating,
                Dryer = src.Dryer
            }));
    }
}