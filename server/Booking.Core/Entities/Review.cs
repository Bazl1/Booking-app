using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Review : EntityBase
{
    public string Description { get; set; }
    public int Stars { get; set; }
    public string AuthorId { get; set; }
    public User? Author { get; set; }
    public string AdvertId { get; set; }
    public Advert? Advert { get; set; }

    public static Review Create(string description, int stars, User author, Advert advert)
    {
        return new Review
        {
            Description = description,
            Stars = stars,
            AuthorId = author.Id,
            Author = author,
            AdvertId = advert.Id,
            Advert = advert
        };
    }
}