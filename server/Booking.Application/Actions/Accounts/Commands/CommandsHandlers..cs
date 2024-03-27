using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Accounts.Commands;

public class CommandsHandlers(
    IUnitOfWork unitOfWork,
    IHttpContextAccessor httpContextAccessor,
    IMapper mapper,
    IImageService imageService,
    IPasswordHasher passwordHasher
) : IRequestHandler<Delete.Request>,
    IRequestHandler<Update.Request, Update.Response>,
    IRequestHandler<UpdateAll.Request, UpdateAll.Response>,
    IRequestHandler<UpdatePassword.Request>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task Handle(Delete.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        unitOfWork.Users.Delete(user);
        unitOfWork.SaveChanges();
    }

    public async Task<Update.Response> Handle(Update.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        if (request.Name != null)
            user.Name = request.Name;
        if (request.PhoneNumber != null)
            user.PhoneNumber = request.PhoneNumber;
        if (request.Avatar != null)
        {
            if (user.Avatar != null)
                imageService.Remove(user.Avatar);
            user.Avatar = imageService.Load(request.Avatar);
        }
        unitOfWork.SaveChanges();
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"));
    }

    public async Task<UpdateAll.Response> Handle(UpdateAll.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        user.Name = request.Name;
        user.PhoneNumber = request.PhoneNumber;
        if (user.Avatar != null)
            imageService.Remove(user.Avatar);
        user.Avatar = imageService.Load(request.Avatar);
        unitOfWork.SaveChanges();
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"));
    }

    public async Task Handle(UpdatePassword.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        if (!passwordHasher.Compare(user.PasswordHash, request.Password))
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Password mismatch"
            );
        user.PasswordHash = passwordHasher.Hash(request.Password);
        unitOfWork.SaveChanges();
    }
}