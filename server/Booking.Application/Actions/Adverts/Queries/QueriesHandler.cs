using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Adverts.Queries;

public class QueriesHandler(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetById.Request, AdvertDto>,
    IRequestHandler<GetAll.Request, GetAll.Response>,
    IRequestHandler<GetReservationDates.Request, GetReservationDates.Response>
{
    public HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<AdvertDto> Handle(GetById.Request request, CancellationToken cancellationToken)
    {
        return mapper.Map<AdvertDto>(
            unitOfWork.Adverts.GetById(request.Id),
            opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"
        );
    }

    public async Task<GetAll.Response> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        var adverts = unitOfWork.Adverts.Search(request.Query, request.UserId);
        return new(
            mapper.Map<IEnumerable<AdvertDto>>(
                adverts
                    .Skip((request.Page - 1) * request.Limit)
                    .Take(request.Limit),
                opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"
            ),
            (int)Math.Ceiling((double)(adverts.Count() / request.Limit))
        );
    }
}