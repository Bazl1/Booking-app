using Booking.Core.Entities;

namespace Booking.Application.Services;

public interface ITokenGenerator
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken(int size = 64);
}