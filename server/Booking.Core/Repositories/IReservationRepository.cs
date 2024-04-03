using Booking.Core.Common;
using Booking.Core.Entities;

namespace Booking.Core.Repositories;

public interface IReservationRepository : IRepository<Reservation>
{
    IEnumerable<Reservation> GetByAdvertId(string advertId, DateOnly? start = null, DateOnly? end = null);
}