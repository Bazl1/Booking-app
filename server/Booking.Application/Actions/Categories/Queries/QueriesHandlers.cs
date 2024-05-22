using AutoMapper;
using Booking.Application.Dtos;
using Booking.Core.Common;
using MediatR;

namespace Booking.Application.Actions.Categories.Queries;

public class QueriesHandlers(
    IUnitOfWork unitOfWork,
    IMapper mapper
) : IRequestHandler<GetAll.Request, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(GetAll.Request request, CancellationToken cancellationToken)
    {
        return mapper.Map<IEnumerable<CategoryDto>>(unitOfWork.Categories.GetAll());
    }
}