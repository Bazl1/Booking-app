using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Entities;

namespace Booking.Application.Profiles;

internal class ReservationProfile : Profile
{
    public ReservationProfile()
    {
        CreateMap<Reservation, ReservationDto>()
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Advert.Name))
            .ForMember(dest => dest.StartDate, opt => opt.MapFrom(src => src.StartDate.ToString("dd/MM/yyyy")))
            .ForMember(dest => dest.EndDate, opt => opt.MapFrom(src => src.EndDate.ToString("dd/MM/yyyy")))
            .ForMember(dest => dest.Poster, opt => opt.MapFrom((src, dest, destMember, context) => $"{context.Items["BASE_URL"]}/{src.Advert.Photos.First()}"))
            .ForMember(dest => dest.NumberOfDays, opt => opt.MapFrom(src => (src.EndDate.ToDateTime(TimeOnly.MinValue) - src.StartDate.ToDateTime(TimeOnly.MinValue)).Days))
            .ForMember(dest => dest.NumberOfPeople, opt => opt.MapFrom(src => src.NumberOfAdults + src.NumberOfChildren));
    }
}
