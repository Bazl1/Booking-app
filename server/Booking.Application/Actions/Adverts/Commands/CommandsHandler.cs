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
    IRequestHandler<Like.Request, Like.Response>,
    IRequestHandler<Update.Request, AdvertDto>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<AdvertDto> Handle(Create.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        if (unitOfWork.Categories.GetById(request.Category) is not Category category)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Category with this id {request.Category} is not found"
            );

        var advert = Advert.Create(
            request.Name, request.Description, user,
            (decimal)request.PricePerNight, request.NumberOfBathrooms, request.NumberOfSingleBeds, request.NumberOfDoubleBeds, request.MaxPeople,
            request.Wifi, request.PetsAllowed, request.TV, request.Refrigerator, request.Kitchen,
            request.Washer, request.Heating, request.Dryer,
            category
        );

        foreach (var photo in request.Photos)
            advert.Photos.Add(imageService.Load(photo));

        unitOfWork.Adverts.Create(advert);
        unitOfWork.SaveChanges();

        return mapper.Map<AdvertDto>(advert, opt =>
        {
            opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
            opt.Items["USER_LIKES"] = user.Likes;
        });
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
        var user = unitOfWork.Users.GetById(userId);

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
        advert.NumberOfBathrooms = request.NumberOfBathrooms;
        advert.NumberOfSingleBeds = request.NumberOfSingleBeds;
        advert.NumberOfDoubleBeds = request.NumberOfDoubleBeds;
        advert.MaxPeople = request.MaxPeople;
        advert.Wifi = request.Wifi;
        advert.PetsAllowed = request.PetsAllowed;
        advert.TV = request.TV;
        advert.Refrigerator = request.Refrigerator;
        advert.Kitchen = request.Kitchen;
        advert.Washer = request.Washer;
        advert.Heating = request.Heating;
        advert.Dryer = request.Dryer;
        if (unitOfWork.Categories.GetById(request.Category) is not Category category)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Category with this id {request.Category} is not found"
            );
        advert.Category = category;
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

        return mapper.Map<AdvertDto>(advert, opt =>
        {
            opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
            opt.Items["USER_LIKES"] = user.Likes;
        });
    }

    public async Task<Like.Response> Handle(Like.Request request, CancellationToken cancellationToken)
    {
        var advert = unitOfWork.Adverts.GetById(request.Id)
            ?? throw new BookingError(BookingErrorType.NOT_FOUND, "Booking with given id is not found");
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        bool result;
        if (user.Likes.Any(a => a.Id == request.Id))
        {
            user.Likes.Remove(advert);
            result = false;
        }
        else
        {
            user.Likes.Add(advert);
            result = true;
        }
        unitOfWork.SaveChanges();

        return new(result);
    }
}