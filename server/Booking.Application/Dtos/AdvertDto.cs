namespace Booking.Application.Dtos;

public class AdvertDto
{
    public string Name { get; set; }
    public string Description { get; set; }
    public UserDto? Owner { get; set; }
    public decimal PricePerNight { get; set; }
    public int NumberOfRooms { get; set; }
    public int NumberOfSingleBeds { get; set; }
    public int NumberOfDoubleBeds { get; set; }
    public bool Wifi { get; set; }
    public bool PetsAllowed { get; set; }
    public bool TV { get; set; }
    public bool Refrigerator { get; set; }
    public bool Kitchen { get; set; }
    public bool Washer { get; set; }
    public bool Heating { get; set; }
    public bool Dryer { get; set; }
    public List<string> Photos { get; set; } = new();
    public List<CategoryDto> Categories { get; set; } = new();
}