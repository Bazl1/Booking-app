namespace Booking.Application.Errors;

public class BookingError : Exception
{
    public BookingErrorType Type { get; init; }
    public BookingError(BookingErrorType type, string message) : base(message)
    {
        Type = type;
    }
}