using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Review : EntityBase
{
    public string Description { get; set; }
    public int Stars { get; set; }
    public string AuthorId { get; set; }
    public User? Author { get; set; }

    public Review(string description, int stars, User author) : base(Guid.NewGuid().ToString())
    {
        Description = description;
        Stars = stars;
        AuthorId = author.Id;
        Author = author;
    }
}