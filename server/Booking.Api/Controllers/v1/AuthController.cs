using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthCommands = Booking.Application.Actions.Auth.Commands;

namespace Booking.Api.Controllers.v1;

[ApiController]
[Route("api/v1/auth")]
public class AuthController(
    IMediator mediator
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(
        [FromBody] AuthCommands.Register.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(
        [FromBody] AuthCommands.Login.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(
        [FromBody] AuthCommands.Logout.Request request
    )
    {
        await mediator.Send(request);
        return Ok("OK");
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh(
        [FromBody] AuthCommands.Refresh.Request request
    )
    {
        return Ok(await mediator.Send(request));
    }
}