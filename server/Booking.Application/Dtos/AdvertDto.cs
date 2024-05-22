namespace Booking.Application.Dtos;

public class AdvertDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public UserDto? Owner { get; set; }
    public decimal PricePerNight { get; set; }
    public int NumberOfBathrooms { get; set; }
    public int NumberOfSingleBeds { get; set; }
    public int NumberOfDoubleBeds { get; set; }
    public int MaxPeople { get; set; }
    public Amenities Amenities { get; set; }
    public List<string> Photos { get; set; } = new();
    public CategoryDto Category { get; set; }
    public int Rating { get; set; } = 0;
    public bool Liked { get; set; } = false;
}

public class Amenities
{
    public bool Wifi { get; set; }
    public bool PetsAllowed { get; set; }
    public bool TV { get; set; }
    public bool Refrigerator { get; set; }
    public bool Kitchen { get; set; }
    public bool Washer { get; set; }
    public bool Heating { get; set; }
    public bool Dryer { get; set; }
}