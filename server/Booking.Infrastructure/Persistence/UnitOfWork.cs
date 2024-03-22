using Booking.Core.Common;
using Booking.Core.Repositories;

namespace Booking.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly BookingDbContext _bookingDbContext;
    public IUserRepository Users { get; private set; }

    public UnitOfWork(
        BookingDbContext bookingDbContext,
        IUserRepository userRepository
    )
    {
        _bookingDbContext = bookingDbContext;
        Users = userRepository;
    }

    public int SaveChanges()
    {
        return _bookingDbContext.SaveChanges();
    }

    public Task SaveChangesAsync()
    {
        return _bookingDbContext.SaveChangesAsync();
    }
}