using Booking.Core.Entities;
using Booking.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence.Repositories;

public class AdvertRepository(
    BookingDbContext bookingDbContext
) : IAdvertRepository
{
    public void Create(Advert entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(Advert entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<Advert> GetAll()
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Categories)
            .Include(a => a.Photos);
    }

    public Advert? GetById(string id)
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Categories)
            .Include(a => a.Photos)
            .SingleOrDefault(a => a.Id == id);
    }
}