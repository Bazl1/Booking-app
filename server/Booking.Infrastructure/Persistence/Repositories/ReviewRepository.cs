using Booking.Core.Entities;
using Booking.Core.Repositories;

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
        return bookingDbContext.Reviews;
    }

    public Review? GetById(string id)
    {
        return bookingDbContext.Reviews
            .SingleOrDefault(r => r.Id == id);
    }
}