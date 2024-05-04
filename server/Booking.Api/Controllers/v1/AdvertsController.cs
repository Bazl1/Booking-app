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
        [FromQuery] string? user = null,
        [FromQuery] string? category = null,
        [FromQuery] string? query = null,
        [FromQuery] string? startDate = null,
        [FromQuery] string? endDate = null,
        [FromQuery] int? minCost = null,
        [FromQuery] int? maxCost = null,
        [FromQuery] int? singleBeds = null,
        [FromQuery] int? doubleBeds = null,
        [FromQuery] bool? wifi = null,
        [FromQuery] bool? pets = null,
        [FromQuery] bool? tv = null,
        [FromQuery] bool? refrigerator = null,
        [FromQuery] bool? kitchen = null,
        [FromQuery] bool? washer = null,
        [FromQuery] bool? heating = null,
        [FromQuery] bool? dryer = null
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetAll.Request(
            page,
            limit,
            user,
            category,
            query,
            startDate,
            endDate,
            minCost,
            maxCost,
            singleBeds,
            doubleBeds,
            wifi,
            pets,
            tv,
            refrigerator,
            kitchen,
            washer,
            heating,
            dryer
        )));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] string id
    )
    {
        return Ok(await mediator.Send(new AdvertsQueries.GetById.Request(id)));
    }
}
