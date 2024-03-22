using Booking.Core.Entities;

namespace Booking.Core.Services;

public interface ITokenGenerator
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken(int size = 64);
}