using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Booking.Application.Actions.Reservations.Queries;

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
        var reservations = request.Type switch
        {
            GetAll.ReservationType.History => unitOfWork.Reservations.GetHistory(userId, request.Status),
            GetAll.ReservationType.Orders => unitOfWork.Reservations.GetOrders(userId, request.Status),
        };
        return new(mapper.Map<IEnumerable<ReservationDto>>(
            reservations,
            opt =>
            { 
                opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}";
            }
        ));
    }
}