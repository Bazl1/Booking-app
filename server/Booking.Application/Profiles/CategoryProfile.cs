using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Entities;

namespace Booking.Application.Profiles;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryDto>();
    }
}