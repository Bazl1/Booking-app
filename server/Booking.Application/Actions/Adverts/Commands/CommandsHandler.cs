using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Application.Services;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Commands;

public class CommandsHandler(
    IUnitOfWork unitOfWork,
    IImageService imageService,
    IHttpContextAccessor httpContextAccessor,
    IMapper mapper
) : IRequestHandler<Create.Request, AdvertDto>,
    IRequestHandler<Delete.Request>,
    IRequestHandler<Update.Request, AdvertDto>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<AdvertDto> Handle(Create.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        var advert = Advert.Create(
            request.Name, request.Description, user,
            (decimal)request.PricePerNight, request.NumberOfRooms, request.NumberOfSingleBeds, request.NumberOfDoubleBeds,
            request.Wifi, request.PetsAllowed, request.TV, request.Refrigerator, request.Kitchen,
            request.Washer, request.Heating, request.Dryer
        );

        foreach (var categoryId in request.Categories)
        {
            if (unitOfWork.Categories.GetById(categoryId) is not Category category)
                throw new BookingError(
                    BookingErrorType.NOT_FOUND,
                    $"Category with this id {categoryId} is not found"
                );
            advert.Categories.Add(category);
        }

        foreach (var photo in request.Photos)
        {
            advert.Photos.Add(imageService.Load(photo));
        }

        unitOfWork.Adverts.Create(advert);
        unitOfWork.SaveChanges();

        return mapper.Map<AdvertDto>(advert);
    }

    public async Task Handle(Delete.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (unitOfWork.Adverts.GetById(request.Id) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Advert with given id {request.Id} is not found"
            );

        if (advert.Owner.Id != userId)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Denied access"
            );

        unitOfWork.Adverts.Delete(advert);
        unitOfWork.SaveChanges();
    }

    public async Task<AdvertDto> Handle(Update.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (unitOfWork.Adverts.GetById(request.Id) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Advert with given id {request.Id} is not found"
            );

        if (advert.Owner.Id != userId)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Denied access"
            );

        advert.Name = request.Name;
        advert.Description = request.Description;
        advert.PricePerNight = (decimal)request.PricePerNight;
        advert.NumberOfRooms = request.NumberOfRooms;
        advert.NumberOfSingleBeds = request.NumberOfSingleBeds;
        advert.NumberOfDoubleBeds = request.NumberOfDoubleBeds;
        advert.Wifi = request.Wifi;
        advert.PetsAllowed = request.PetsAllowed;
        advert.TV = request.TV;
        advert.Refrigerator = request.Refrigerator;
        advert.Kitchen = request.Kitchen;
        advert.Washer = request.Washer;
        advert.Heating = request.Heating;
        advert.Dryer = request.Dryer;
        advert.Categories.Clear();
        foreach (var categoryId in request.Categories)
        {
            if (unitOfWork.Categories.GetById(categoryId) is not Category category)
                throw new BookingError(
                    BookingErrorType.NOT_FOUND,
                    $"Category with this id {categoryId} is not found"
                );
            advert.Categories.Add(category);
        }
        if (request.Urls != null)
        {
            foreach (var photo in request.Urls)
            {
                var photoFileName = photo.Substring(photo.LastIndexOf("/"));
                if (!advert.Photos.Contains(photoFileName))
                {
                    imageService.Remove(photoFileName);
                    advert.Photos.Remove(photoFileName);
                }
            }
        }
        if (request.Photos != null)
            foreach (var photo in request.Photos)
                advert.Photos.Add(imageService.Load(photo));

        unitOfWork.SaveChanges();

        return mapper.Map<AdvertDto>(advert);
    }
}