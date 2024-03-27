using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using Booking.Application.Services;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Auth.Commands;

public class CommandsHandlers(
    IUnitOfWork unitOfWork,
    IPasswordHasher passwordHasher,
    ITokenGenerator tokenGenerator,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<Register.Request, Register.Response>,
    IRequestHandler<Login.Request, Login.Response>,
    IRequestHandler<Logout.Request>,
    IRequestHandler<Refresh.Request, Refresh.Response>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<Register.Response> Handle(Register.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Users.GetByEmail(request.Email) is not null)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "User with given email is already exists"
            );
        var user = User.Create(request.Name, request.Email, passwordHasher.Hash(request.Password), request.PhoneNumber);
        var refreshToken = tokenGenerator.GenerateRefreshToken();
        user.SetToken(refreshToken, DateTime.UtcNow.AddMinutes(60));
        var accessToken = tokenGenerator.GenerateAccessToken(user);
        unitOfWork.Users.Create(user);
        unitOfWork.SaveChanges();
        Context?.Response.Cookies.Append("Booking.Auth", refreshToken);
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"), accessToken, refreshToken);
    }

    public async Task<Login.Response> Handle(Login.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Users.GetByEmail(request.Email) is not User user)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "User with given email is not exists"
            );
        if (!passwordHasher.Compare(user.PasswordHash, request.Password))
            throw new BookingError(
                    BookingErrorType.VALIDATION_ERROR,
                    "Invalid password"
                );
        var refreshToken = tokenGenerator.GenerateRefreshToken();
        user.SetToken(refreshToken, DateTime.UtcNow.AddMinutes(60));
        unitOfWork.SaveChanges();
        var accessToken = tokenGenerator.GenerateAccessToken(user);
        Context?.Response.Cookies.Append("Booking.Auth", refreshToken);
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"), accessToken, refreshToken);
    }

    public async Task Handle(Logout.Request request, CancellationToken cancellationToken)
    {
        var userId = Context?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        user.Logout();
        unitOfWork.SaveChanges();
        Context?.Response.Cookies.Delete("Booking.Auth");
    }

    public async Task<Refresh.Response> Handle(Refresh.Request request, CancellationToken cancellationToken)
    {
        var token = Context.Request.Cookies["Booking.Auth"];
        if (unitOfWork.Users.GetByToken(token) is not User user)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid refresh token"
            );
        if (user.IsTokenExpired())
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Refresh token expired"
            );
        var refreshToken = tokenGenerator.GenerateRefreshToken();
        user.SetToken(refreshToken, DateTime.UtcNow.AddMinutes(60));
        unitOfWork.SaveChanges();
        var accessToken = tokenGenerator.GenerateAccessToken(user);
        Context?.Response.Cookies.Append("Booking.Auth", refreshToken);
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"), accessToken, refreshToken);
    }
}