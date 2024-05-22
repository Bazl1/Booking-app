using AutoMapper;
using Booking.Application.Dtos;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Booking.Application.Actions.Accounts.Queries;

public class QueriesHandlers(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<GetAll.Request, GetAll.Response>,
    IRequestHandler<GetById.Request, GetById.Response>
{
    private HttpContext? Context => httpContextAccessor.HttpContext;

    public async Task<GetAll.Response> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        return new(mapper.Map<IEnumerable<UserDto>>(unitOfWork.Users, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"));
    }

    public async Task<GetById.Response> Handle(GetById.Request request, CancellationToken cancellationToken)
    {
        if (unitOfWork.Users.GetById(request.Id) is not User user)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "User with given id is not found"
            );
        return new(mapper.Map<UserDto>(user, opt => opt.Items["BASE_URL"] = $"{Context.Request.Scheme}://{Context.Request.Host}"));
    }
}