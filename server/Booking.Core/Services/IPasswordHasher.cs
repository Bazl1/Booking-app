namespace Booking.Core.Services;

public interface IPasswordHasher
{
    string Hash(string password);
    bool Compare(string passwordHash, string password);
}