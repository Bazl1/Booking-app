using Booking.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence;

public class BookingDbContext : DbContext
{
    public DbSet<User> Users { get; }

    public BookingDbContext(DbContextOptions options) : base(options)
    {
    }
}