using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Advert : EntityBase
{
    public string Name { get; set; }
    public string Description { get; set; }
    public string OwnerId { get; set; }
    public User? Owner { get; set; }
    public decimal PricePerNight { get; set; }
    public int NumberOfBathrooms { get; set; }
    public int NumberOfSingleBeds { get; set; }
    public int NumberOfDoubleBeds { get; set; }
    public int MaxPeople { get; set; }
    public bool Wifi { get; set; }
    public bool PetsAllowed { get; set; }
    public bool TV { get; set; }
    public bool Refrigerator { get; set; }
    public bool Kitchen { get; set; }
    public bool Washer { get; set; }
    public bool Heating { get; set; }
    public bool Dryer { get; set; }
    public string CategoryId { get; set; }
    public Category Category { get; set; }
    public List<string> Photos { get; set; } = new();
    public List<Reservation> Reservations { get; set; } = new();

    public static Advert Create(
        string name, string description, User owner, decimal pricePerNight,
        int numberOfBathrooms, int numberOfSingleBeds, int numberOfDoubleBeds, int maxPeople,
        bool wifi, bool petsAllowed, bool tv, bool refrigerator, bool kitchen, bool washer, bool heating, bool dryer,
        Category category
        )
    {
        return new Advert
        {
            Name = name,
            Description = description,
            OwnerId = owner.Id,
            Owner = owner,
            PricePerNight = pricePerNight,
            NumberOfBathrooms = numberOfBathrooms,
            NumberOfSingleBeds = numberOfSingleBeds,
            NumberOfDoubleBeds = numberOfDoubleBeds,
            MaxPeople = maxPeople,
            Wifi = wifi,
            PetsAllowed = petsAllowed,
            TV = tv,
            Refrigerator = refrigerator,
            Kitchen = kitchen,
            Washer = washer,
            Heating = heating,
            Dryer = dryer,
            CategoryId = category.Id,
            Category = category
        };
    }
}