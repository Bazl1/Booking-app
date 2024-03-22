using Booking.Core.Common;

namespace Booking.Core.Entities;

public class User : EntityBase
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string PhoneNumber { get; set; }
    public string? Token { get; set; }
    public DateTime ExpiryIn { get; set; }

    public User(string name, string email, string passwordHash, string phoneNumber) : base(Guid.NewGuid().ToString())
    {
        Name = name;
        Email = email;
        PasswordHash = passwordHash;
        PhoneNumber = phoneNumber;
    }

    public void SetToken(string token, DateTime expiryIn)
    {
        Token = token;
        ExpiryIn = expiryIn;
    }

    public void Logout()
    {
        Token = null;
    }

    public bool IsTokenExpired()
    {
        return DateTime.UtcNow >= ExpiryIn;
    }
}