using Booking.Core.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReservationsCommands = Booking.Application.Actions.Reservations.Commands;
using ReservationsQueries = Booking.Application.Actions.Reservations.Queries;

[ApiController]
[Authorize]
[Route("api/v1/reservations")]
public class ReservationsController(
    IMediator mediator
) : ControllerBase
{
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Create(
        [FromForm] ReservationsCommands.Create.Request request
    )
    {
        await mediator.Send(request);
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ReservationsQueries.GetAll.ReservationType type,
        [FromQuery] ReservationStatus? status = null
    )
    {
        return Ok(await mediator.Send(new ReservationsQueries.GetAll.Request(type, status)));
    }

    [HttpPut("{id}/reject")]
    public async Task<IActionResult> Reject(
        [FromRoute] string id)
    {
        await mediator.Send(new ReservationsCommands.Reject.Request(id));
        return NoContent();
    }

    [HttpPut("{id}/accept")]
    public async Task<IActionResult> Accept(
        [FromRoute] string id)
    {
        await mediator.Send(new ReservationsCommands.Accept.Request(id));
        return NoContent();
    }

    [HttpGet("dates")]
    [AllowAnonymous]
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

    [HttpGet("dates/details")]
    [AllowAnonymous]
    public async Task<IActionResult> GetReservationDatesDetails(
        [FromQuery] string id,
        [FromQuery] int month,
        [FromQuery] int year
    )
    {
        return Ok(await mediator.Send(
            new Booking.Application.Actions.Adverts.Queries.GetReservationDatesDetails.Request(id, month, year))
        );
    }
}