using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Category : EntityBase
{
    public string Name { get; set; }
    public string Icon { get; set; }
    public List<Advert> Adverts { get; set; } = new();

    public static Category Create(string name, string icon)
    {
        return new Category
        {
            Name = name,
            Icon = icon
        };
    }
}