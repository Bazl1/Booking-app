namespace Booking.Application.Dtos;

public class ReviewDto
{
    public string Id { get; set; }
    public string Description { get; set; }
    public int Stars { get; set; }
    public UserDto Author { get; set; }
}