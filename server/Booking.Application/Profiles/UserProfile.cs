using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Entities;

namespace Booking.Application.Profiles;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(dest => dest.Initials, opt => opt.MapFrom(src => src.Name.Substring(0, 2)))
            .ForMember(dest => dest.Avatar, opt => opt.MapFrom((src, dest, destMember, context) => src.Avatar != null ? $"{context.Items["BASE_URL"]}/{src.Avatar}" : null));
    }
}