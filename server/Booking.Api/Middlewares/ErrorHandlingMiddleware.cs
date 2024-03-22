using System.Net;
using Booking.Application.Errors;

namespace Booking.Api.Middlewares;

public class ErrorHandlingMiddleware(
    RequestDelegate next
)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(context, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
        object response = exception switch
        {
            BookingError bookingError => new { Error = new { Type = bookingError.Type.ToString(), Message = bookingError.Message } },
            _ => new { Error = new { Message = exception.Message } },
        };
        await context.Response.WriteAsJsonAsync(response);
    }
}