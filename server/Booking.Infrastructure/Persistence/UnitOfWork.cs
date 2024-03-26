using Booking.Core.Common;
using Booking.Core.Repositories;

namespace Booking.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly BookingDbContext _bookingDbContext;
    public IUserRepository Users { get; private set; }

    public IAdvertRepository Adverts { get; private set; }

    public ICategoryRepository Categories { get; private set; }

    public IReservationRepository Reservations { get; private set; }

    public IReviewRepository Reviews { get; private set; }

    public UnitOfWork(
        BookingDbContext bookingDbContext,
        IUserRepository userRepository,
        IAdvertRepository advertRepository,
        ICategoryRepository categoryRepository,
        IReservationRepository reservationRepository,
        IReviewRepository reviewRepository
    )
    {
        _bookingDbContext = bookingDbContext;
        Users = userRepository;
        Adverts = advertRepository;
        Categories = categoryRepository;
        Reservations = reservationRepository;
        Reviews = reviewRepository;
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