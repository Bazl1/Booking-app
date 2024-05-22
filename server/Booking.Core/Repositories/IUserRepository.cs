using Booking.Core.Common;
using Booking.Core.Entities;

namespace Booking.Core.Repositories;

public interface IUserRepository : IRepository<User>
{
    User? GetByEmail(string email);
    User? GetByToken(string token);
}