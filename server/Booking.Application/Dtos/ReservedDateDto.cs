namespace Booking.Application.Dtos;

public class ReservedDateDto
{
    public DateOnly Date { get; set; }
    public bool Reserved { get; set; }
}