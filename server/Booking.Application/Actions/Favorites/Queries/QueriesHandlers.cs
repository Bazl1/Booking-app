using System.Security.Claims;
using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Favorites.Queries;

public class QueriesHandlers(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetAll.Request, GetAll.Response>
{
    public HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<GetAll.Response> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        if (request.Page < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Page must be greater than 0"
            );
        if (request.Limit < 1)
            throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Limit must be greater than 0"
            );

        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                user.Likes.Skip((request.Page - 1) * request.Limit).Take(request.Limit),
                opt =>
                {
                    opt.Items["USER_LIKES"] = user.Likes;
                }
            ),
            (int)Math.Ceiling((double)user.Likes.Count / (double)request.Limit)
        );
    }
}
