using System.Security.Claims;
using AutoMapper;
using Booking.Application.Actions.Favorites.Queries.GetAll;
using Booking.Application.Dtos;
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
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);
        return new(mapper.Map<IEnumerable<AdvertDto>>(user.Likes));
    }
}
