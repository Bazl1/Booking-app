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
    public int NumberOfGuests { get; set; }


    public Reservation(User author, Advert advert, DateOnly startDate, DateOnly endDate, int numberOfGuests) : base(Guid.NewGuid().ToString())
    {
        AuthorId = author.Id;
        Author = author;
        AdvertId = advert.Id;
        Advert = advert;
        StartDate = startDate;
        EndDate = endDate;
        NumberOfGuests = numberOfGuests;
    }
}