namespace Booking.Application.Dtos;

#pragma warning disable

public class ReservationDto
{
    public string Id { get; set; }
    public string Title { get; set; }
    public string Poster { get; set; }
    public UserDto Author { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public int NumberOfDays { get; set; }
    public float Cost { get; set; }
    public int NumberOfPeople { get; set; }
    public string Status { get; set; }
}
