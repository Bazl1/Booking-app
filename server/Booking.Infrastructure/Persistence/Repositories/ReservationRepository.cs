using System.ComponentModel;
using Booking.Core.Entities;
using Booking.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence.Repositories;

public class ReservationRepository(
    BookingDbContext bookingDbContext
) : IReservationRepository
{
    public void Create(Reservation entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(Reservation entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<Reservation> GetAll()
    {
        return bookingDbContext.Reservations;
    }

    public Reservation? GetById(string id)
    {
        return bookingDbContext.Reservations
            .SingleOrDefault(r => r.Id == id);
    }

    public IEnumerable<Reservation> GetByAdvertId(string advertId, DateOnly? start = null, DateOnly? end = null)
    {
        return bookingDbContext.Reservations
            .Include(r => r.Author)
            .Include(r => r.Advert)
            .Where(r => r.AdvertId == advertId &&
                (start == null || r.StartDate <= start) &&
                (end == null || r.EndDate >= end)
            );
    }
}