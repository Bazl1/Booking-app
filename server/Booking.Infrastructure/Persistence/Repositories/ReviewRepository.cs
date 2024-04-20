using Booking.Core.Entities;
using Booking.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence.Repositories;

public class ReviewRepository(
    BookingDbContext bookingDbContext
) : IReviewRepository
{
    public void Create(Review entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(Review entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<Review> GetAll()
    {
        return bookingDbContext.Reviews
            .Include(r => r.Author);
    }

    public IEnumerable<Review> GetByAdvertId(string advertId)
    {
        return bookingDbContext.Reviews
            .Include(r => r.Author)
            .Where(r => r.AdvertId == advertId);
    }

    public Review? GetById(string id)
    {
        return bookingDbContext.Reviews
            .Include(r => r.Author)
            .SingleOrDefault(r => r.Id == id);
    }
}