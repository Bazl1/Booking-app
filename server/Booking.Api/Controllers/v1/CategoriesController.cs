using MediatR;
using Microsoft.AspNetCore.Mvc;
using CategoriesQueries = Booking.Application.Actions.Categories.Queries;

namespace Booking.Api.Controllers.v1;

[ApiController]
[Route("api/v1/categories")]
public class CategoriesController(
    IMediator mediator
) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await mediator.Send(new CategoriesQueries.GetAll.Request()));
    }
}