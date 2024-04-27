using MediatR;
using Microsoft.AspNetCore.Mvc;
using AdvertsCommands = Booking.Application.Actions.Adverts.Commands;
using AdvertsQueries = Booking.Application.Actions.Adverts.Queries;

[ApiController]
[Route("api/v1/adverts")]
public class AdvertsController(
    IMediator mediator
) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] AdvertsCommands.Create.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        [FromRoute] string id
    )
    {
        await mediator.Send(new AdvertsCommands.Delete.Request(id));
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        [FromRoute] string id,
        [FromForm] AdvertsCommands.Update.Request request
    )
    {
        request.Id = id;
        return Ok(await mediator.Send(request));
    }

    [HttpPut("{id}/like")]
    public async Task<IActionResult> ToogleLike(
        [FromRoute] string id
    )
    {
        return Ok(await mediator.Send(new AdvertsCommands.Like.Request(id)));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int? page = null,
        [FromQuery] int? limit = null,
        [FromQuery] string? query = null,
        [FromQuery] string? user = null,
        [FromQuery] string? category = null
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetAll.Request(page, limit, query, user, category)));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] string id
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetById.Request(id)));
    }
}
