using MediatR;
using Microsoft.AspNetCore.Mvc;
using ReservationsCommands = Booking.Application.Actions.Reservations.Commands;

[ApiController]
[Route("api/v1/reservations")]
public class ReservationsController(
    IMediator mediator
) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(
        [FromForm] ReservationsCommands.Create.Request request
    )
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpGet("dates")]
    public async Task<IActionResult> GetReservationDates(
        [FromQuery] string id,
        [FromQuery] int month,
        [FromQuery] int year
    )
    {
        return Ok(await mediator.Send(
            new Booking.Application.Actions.Adverts.Queries.GetReservationDates.Request(id, month, year))
        );
    }
}