using Booking.Core.Entities;
using Booking.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Persistence.Repositories;

public class AdvertRepository(
    BookingDbContext bookingDbContext
) : IAdvertRepository
{
    public void Create(Advert entity)
    {
        bookingDbContext.Add(entity);
    }

    public void Delete(Advert entity)
    {
        bookingDbContext.Remove(entity);
    }

    public IEnumerable<Advert> GetAll()
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Category)
            .Include(a => a.Reservations);
    }

    public Advert? GetById(string id)
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Category)
            .Include(a => a.Reservations)
            .SingleOrDefault(a => a.Id == id);
    }

    public IEnumerable<Advert> Search(
        string? query = null,
        string? user = null,
        string? category = null,
        DateOnly? startDate = null,
        DateOnly? endDate = null,
        int? minCost = null,
        int? maxCost = null,
        int? singleBeds = null,
        int? doubleBeds = null,
        bool? wifi = null,
        bool? petsAllowed = null,
        bool? tv = null,
        bool? refrigerator = null,
        bool? kitchen = null,
        bool? washer = null,
        bool? heating = null,
        bool? dryer = null)
    {
        return bookingDbContext.Adverts
            .Include(a => a.Owner)
            .Include(a => a.Category)
            .Include(a => a.Reservations)
            .Where(a =>
                (user == null || a.OwnerId == user) &&
                (query == null || a.Name.ToUpper().Contains(query.ToUpper())) &&
                (category == null || a.CategoryId == category) &&

                (startDate == null || endDate == null || a.Reservations.Any(r => r.StartDate <= endDate && r.EndDate >= startDate)) &&

                (minCost == null || minCost <= a.PricePerNight) &&
                (maxCost == null || a.PricePerNight <= maxCost) &&

                (singleBeds == null || CheckNumberOfSignleBeds(a, (int)singleBeds)) &&
                (doubleBeds == null || CheckNumberOfDoubleBeds(a, (int)doubleBeds)) &&

                (wifi == null || a.Wifi) &&
                (petsAllowed == null || a.PetsAllowed) &&
                (tv == null || a.TV) &&
                (refrigerator == null || a.Refrigerator) &&
                (kitchen == null || a.Kitchen) &&
                (washer == null || a.Washer) &&
                (heating == null || a.Heating)
            );
    }

    private bool CheckNumberOfSignleBeds(Advert advert, int numberOfSignleBeds)
    {
        if (numberOfSignleBeds < 8)
        {
            return advert.NumberOfSingleBeds == numberOfSignleBeds;
        }
        else
        {
            return advert.NumberOfSingleBeds >= numberOfSignleBeds;
        }
    }

    private bool CheckNumberOfDoubleBeds(Advert advert, int numberOfDoubleBeds)
    {
        if (numberOfDoubleBeds < 8)
        {
            return advert.NumberOfDoubleBeds == numberOfDoubleBeds;
        }
        else
        {
            return advert.NumberOfDoubleBeds >= numberOfDoubleBeds;
        }
    }
}