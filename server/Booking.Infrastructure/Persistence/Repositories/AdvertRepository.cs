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
            .Include(a => a.Category);
    }

    public Advert? GetById(string id)
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Category)
            .SingleOrDefault(a => a.Id == id);
    }

    public IEnumerable<Advert> Search(string? query = null, string? user = null)
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Category)
            .Where(a =>
                (user == null || a.OwnerId == user) &&
                (query == null || a.Name.ToUpper().Contains(query.ToUpper()))
            );
    }
}