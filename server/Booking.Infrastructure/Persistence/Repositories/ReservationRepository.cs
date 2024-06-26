using Booking.Core.Entities;
using Booking.Core.Enums;
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
                r.Status == ReservationStatus.Accepted &&
                (start == null || r.StartDate >= start) &&
                (end == null || r.EndDate <= end)
            );
    }

    public IEnumerable<Reservation> GetHistory(string userId, ReservationStatus? status = null)
    {
        return bookingDbContext.Reservations
            .Include(r => r.Author)
            .Include(r => r.Advert)
            .Where(r => r.AuthorId == userId &&
                (status == null || r.Status == status)
            );
    }

    public IEnumerable<Reservation> GetOrders(string userId, ReservationStatus? status = null)
    {
        return bookingDbContext.Reservations
            .Include(r => r.Author)
            .Include(r => r.Advert)
            .Where(r => r.Advert.OwnerId == userId &&
                (status == null || r.Status == status)
            );
    }
}