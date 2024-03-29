using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AccountsCommands = Booking.Application.Actions.Accounts.Commands;
using AccountsQueries = Booking.Application.Actions.Accounts.Queries;

namespace Booking.Api.Controllers.v1;

[ApiController]
[Route("api/v1/accounts")]
public class AccountsController(
    IMediator mediator
) : ControllerBase
{
    [HttpPatch]
    [Authorize]
    public async Task<IActionResult> Update(
        [FromBody] AccountsCommands.Update.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> UpdateAll(
        [FromForm] AccountsCommands.UpdateAll.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Delete(
        [FromBody] AccountsCommands.Delete.Request request
    )
    {
        await mediator.Send(request);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await mediator.Send(new AccountsQueries.GetAll.Request()));
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        [FromRoute] string id
    )
    {
        return Ok(await mediator.Send(new AccountsQueries.GetById.Request(id)));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> UpdatePassword(
        [FromBody] AccountsCommands.UpdatePassword.Request request
    )
    {
        await mediator.Send(request);
        return Ok();
    }
}