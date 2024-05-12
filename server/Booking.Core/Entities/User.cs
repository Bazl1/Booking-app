using Booking.Core.Common;

namespace Booking.Core.Entities;

public class User : EntityBase
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string? Avatar { get; set; }
    public string PasswordHash { get; set; }
    public string PhoneNumber { get; set; }
    public string? Token { get; set; }
    public DateTime ExpiryIn { get; set; }
    public List<Reservation> Reservations { get; set; } = new();
    public List<Advert> Adverts { get; set; } = new();
    public List<Advert> Likes { get; set; } = new();
    public List<Review> Reviews { get; set; } = new();

    public static User Create(string name, string email, string passwordHash, string phoneNumber)
    {
        return new User
        {
            Name = name,
            Email = email,
            PasswordHash = passwordHash,
            PhoneNumber = phoneNumber
        };
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