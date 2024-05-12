using Azure;
using Booking.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

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
        modelBuilder.Entity<Advert>()
            .HasOne(a => a.Category)
            .WithMany(c => c.Adverts)
            .HasForeignKey(a => a.CategoryId);

        modelBuilder.Entity<Review>()
            .HasOne(r => r.Author)
            .WithMany(u => u.Reviews)
            .HasForeignKey(r => r.AuthorId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Review>()
            .HasOne(r => r.Advert)
            .WithMany(a => a.Reviews)
            .HasForeignKey(r => r.AdvertId);

        modelBuilder.Entity<Reservation>()
            .HasOne(r => r.Author)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.AuthorId)
            .OnDelete(DeleteBehavior.NoAction);

        modelBuilder.Entity<Advert>()
            .HasOne(a => a.Owner)
            .WithMany(u => u.Adverts)
            .HasForeignKey(a => a.OwnerId);

        modelBuilder.Entity<User>()
            .HasMany(u => u.Likes)
            .WithMany(a => a.LikedByUsers)
            .UsingEntity(
                l => l.HasOne(typeof(Advert)).WithMany().HasForeignKey("AdvertFK").OnDelete(DeleteBehavior.NoAction),
                r => r.HasOne(typeof(User)).WithMany().HasForeignKey("UserFK").OnDelete(DeleteBehavior.NoAction)
            );

        modelBuilder.Entity<Reservation>()
            .Property(r => r.Cost)
            .HasColumnType("money");

        base.OnModelCreating(modelBuilder);
    }
}