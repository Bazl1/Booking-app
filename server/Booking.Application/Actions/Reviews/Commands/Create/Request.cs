using MediatR;

namespace Booking.Application.Actions.Reviews.Commands.Create;

public record Request(string AdvertId, string Description, int Stars) : IRequest;
