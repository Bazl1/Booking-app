namespace Booking.Infrastructure.Options;

public class JwtOptions
{
    public string Issuer { get; init; }
    public string Audience { get; init; }
    public int LifetimeInMinutes { get; init; }
    public string SecretKey { get; init; }
}