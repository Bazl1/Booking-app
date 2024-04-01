using Booking.Core.Common;
using Booking.Core.Entities;

namespace Booking.Core.Repositories;

public interface IAdvertRepository : IRepository<Advert>
{
    IEnumerable<Advert> Search(string? query = null, string? user = null);
}