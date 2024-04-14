using Booking.Core.Entities;
using Booking.Core.Repositories;
using Microsoft.EntityFrameworkCore;

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
        return bookingDbContext.Users
            .Include(u => u.Likes)
            .Include(u => u.Adverts)
            .Include(u => u.Reviews);
    }

    public User? GetByEmail(string email)
    {
        return bookingDbContext.Users
            .Include(u => u.Likes)
            .Include(u => u.Adverts)
            .Include(u => u.Reviews)
            .SingleOrDefault(u => u.Email == email);
    }

    public User? GetById(string id)
    {
        return bookingDbContext.Users
            .Include(u => u.Likes)
            .Include(u => u.Adverts)
            .Include(u => u.Reviews)
            .SingleOrDefault(u => u.Id == id);
    }

    public User? GetByToken(string token)
    {
        return bookingDbContext.Users
            .Include(u => u.Likes)
            .Include(u => u.Adverts)
            .Include(u => u.Reviews)
            .SingleOrDefault(u => u.Token == token);
    }
}