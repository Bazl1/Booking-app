using Booking.Core.Entities;
using Booking.Core.Repositories;

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
}