using Booking.Application.Dtos;
using MediatR;

namespace Booking.Application.Actions.Categories.Queries.GetAll;

public record Request() : IRequest<IEnumerable<CategoryDto>>;