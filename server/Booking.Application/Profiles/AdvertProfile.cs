using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Entities;

namespace Booking.Application.Profiles;

public class AdvertProfile : Profile
{
    public AdvertProfile()
    {
        CreateMap<Advert, AdvertDto>()
        .ForMember(dest => dest.Photos, opt => opt.MapFrom((src, dest, destMember, context) => src.Photos.Select(photo => $"{context.Items["BASE_URL"]}/{photo}")));
    }
}