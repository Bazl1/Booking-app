using Booking.Core.Entities;
using Booking.Core.Repositories;

namespace Booking.Infrastructure.Persistence.Repositories;

public class UserRepository(
    BookingDbContext bookingDbContext
) : IUserRepository
{
    public void Create(User entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(User entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<User> GetAll()
    {
        return bookingDbContext.Users;
    }

    public User? GetByEmail(string email)
    {
        return bookingDbContext.Users.SingleOrDefault(u => u.Email == email);
    }

    public User? GetById(string id)
    {
        return bookingDbContext.Users.SingleOrDefault(u => u.Id == id);
    }

    public User? GetByToken(string token)
    {
        return bookingDbContext.Users.SingleOrDefault(u => u.Token == token);
    }
}