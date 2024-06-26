using Booking.Core.Common;
using Booking.Core.Entities;

namespace Booking.Core.Repositories;

public interface IReviewRepository : IRepository<Review>
{
    IEnumerable<Review> GetByAdvertId(string advertId);
}