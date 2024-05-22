using Booking.Core.Repositories;

namespace Booking.Core.Common;

public interface IUnitOfWork
{
    public IUserRepository Users { get; }
    public IAdvertRepository Adverts { get; }
    public ICategoryRepository Categories { get; }
    public IReservationRepository Reservations { get; }
    public IReviewRepository Reviews { get; }
    int SaveChanges();
    Task SaveChangesAsync();
}