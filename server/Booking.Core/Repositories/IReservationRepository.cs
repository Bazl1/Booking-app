using Booking.Core.Common;
using Booking.Core.Entities;
using Booking.Core.Enums;

namespace Booking.Core.Repositories;

public interface IReservationRepository : IRepository<Reservation>
{
    IEnumerable<Reservation> GetByAdvertId(string advertId, DateOnly? start = null, DateOnly? end = null);
    IEnumerable<Reservation> GetHistory(string userId, ReservationStatus? status = null);
    IEnumerable<Reservation> GetOrders(string userId, ReservationStatus? status = null);
}