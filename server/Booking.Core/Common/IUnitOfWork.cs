using Booking.Core.Repositories;

namespace Booking.Core.Common;

public interface IUnitOfWork
{
    public IUserRepository Users { get; }
    int SaveChanges();
    Task SaveChangesAsync();
}