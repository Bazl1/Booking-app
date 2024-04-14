using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FavoritesQueries = Booking.Application.Actions.Favorites.Queries;

[ApiController]
[Authorize]
[Route("api/v1/favorites")]
public class FavoritesController(
    IMediator mediator
) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page,
        [FromQuery] int limit
    )
    {
        return Ok(await mediator.Send(new FavoritesQueries.GetAll.Request(limit, page)));
    }
}