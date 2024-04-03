using Booking.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence;

public class BookingDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Advert> Adverts { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Review> Reviews { get; set; }

    public BookingDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Advert>(e =>
        {
            e.HasOne(e => e.Owner).WithMany(e => e.Adverts);
            e.HasOne(e => e.Category).WithMany(e => e.Adverts);
            e.HasMany(e => e.Reservations).WithOne(e => e.Advert);
        });

        modelBuilder.Entity<User>(e =>
        {
            e.HasMany(e => e.Likes);
        });

        base.OnModelCreating(modelBuilder);
    }
}