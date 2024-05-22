using Booking.Application.Dtos;

namespace Booking.Application.Actions.Accounts.Queries.GetAll;

public record Response(
    IEnumerable<UserDto> Users
);