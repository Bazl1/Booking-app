using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReviewCommands = Booking.Application.Actions.Reviews.Commands;

[ApiController]
[Route("api/v1/reviews")]
public class ReviewsController(
    IMediator mediator
) : ControllerBase
{
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create(
        [FromForm] ReviewCommands.Create.Request request)
    {
        await mediator.Send(request);
        return NoContent();
    }
}