using MediatR;
using Microsoft.AspNetCore.Mvc;
using AdvertsCommands = Booking.Application.Actions.Adverts.Commands;
using AdvertsQueries = Booking.Application.Actions.Adverts.Queries;

[ApiController]
[Route("api/v1/accounts")]
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
    public async Task<IActionResult> Create(
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

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] int page,
        [FromQuery] int limit
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetAll.Request(page, limit)));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] string id
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetById.Request(id)));
    }
}
