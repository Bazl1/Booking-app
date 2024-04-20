using AutoMapper;
using Booking.Application.Errors;
using Booking.Core.Common;
using Booking.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

namespace Booking.Application.Actions.Reviews.Commands;

public class CommandsHandlers(
    IUnitOfWork unitOfWork,
    IMapper mapper,
    IHttpContextAccessor httpContextAccessor
) : IRequestHandler<Create.Request>
{
    private HttpContext Context => httpContextAccessor.HttpContext;

    public Task Handle(Create.Request request, CancellationToken cancellationToken)
    {
        var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = unitOfWork.Users.GetById(userId);

        if (unitOfWork.Adverts.GetById(request.AdvertId) is not Advert advert)
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                "Advert with given id is not found"
            );

        var review = Review.Create(request.Description, request.Stars, user, advert);
        unitOfWork.Reviews.Create(review);
        unitOfWork.SaveChanges();
        return Task.CompletedTask;
    }
}
