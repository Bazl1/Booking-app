using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Reservation : EntityBase
{
    public string AuthorId { get; set; }
    public User? Author { get; set; }
    public string AdvertId { get; set; }
    public Advert? Advert { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
    public int NumberOfAdults { get; set; }
    public int NumberOfChildren { get; set; }
    public bool Pets { get; set; }

    public static Reservation Create(User author, Advert advert, DateOnly startDate, DateOnly endDate, int numberOfAdults, int numberOfChildren, bool pets)
    {
        return new Reservation
        {
            AuthorId = author.Id,
            Author = author,
            AdvertId = advert.Id,
            Advert = advert,
            StartDate = startDate,
            EndDate = endDate,
            NumberOfAdults = numberOfAdults,
            NumberOfChildren = numberOfChildren,
            Pets = pets,
        };
    }
}