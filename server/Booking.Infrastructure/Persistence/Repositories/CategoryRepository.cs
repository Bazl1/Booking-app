using Booking.Core.Entities;
using Booking.Core.Repositories;

namespace Booking.Infrastructure.Persistence.Repositories;

public class CategoryRepository(
    BookingDbContext bookingDbContext
) : ICategoryRepository
{
    public void Create(Category entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(Category entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<Category> GetAll()
    {
        return bookingDbContext.Categories;
    }

    public Category? GetById(string id)
    {
        return bookingDbContext.Categories
            .SingleOrDefault(c => c.Id == id);
    }
}