using Booking.Core.Common;

namespace Booking.Core.Entities;

public class Category : EntityBase
{
    public string Name { get; set; }
    public string Icon { get; set; }
    public List<Advert> Adverts { get; set; } = new();

    public Category(string name, string icon) : base(Guid.NewGuid().ToString())
    {
        Name = name;
        Icon = icon;
    }
}