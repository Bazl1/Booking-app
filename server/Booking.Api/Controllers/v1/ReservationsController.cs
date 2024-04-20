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
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ReservationsQueries.GetAll.ReservationType type,
        [FromQuery] ReservationStatus? status = null
    )
    {
        return Ok(new ReservationsQueries.GetAll.Request(type, status));
    }

    [HttpPut("{id}/reject")]
    public async Task<IActionResult> Reject(
        [FromRoute] string id)
    {
        return Ok(new ReservationsCommands.Reject.Request(id));
    }

    [HttpPut("{id}/accept")]
    public async Task<IActionResult> Accept(
        [FromRoute] string id)
    {
        return Ok(new ReservationsCommands.Accept.Request(id));
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
}