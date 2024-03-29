using Booking.Application.Dtos;
using MediatR;

namespace Booking.Application.Actions.Adverts.Queries.GetById;

public record Request(
    string Id
) : IRequest<AdvertDto>;