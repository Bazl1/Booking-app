using Microsoft.Extensions.DependencyInjection;

namespace Booking.Infrastructure.Persistence.Seeds;

public static class CategorySeed
{
    public static void Seed(IServiceProvider serviceProvider)
    {
        using var db = serviceProvider.GetRequiredService<BookingDbContext>();
        db.Categories.AddRange(
            new Core.Entities.Category
            {
                Name = "Amazing pools",
                Icon = "http://localhost:5103/icons/amazingpools.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Beachfront",
                Icon = "http://localhost:5103/icons/beachfront.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Cabins",
                Icon = "http://localhost:5103/icons/cabins.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Castles",
                Icon = "http://localhost:5103/icons/castles.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Countryside",
                Icon = "http://localhost:5103/icons/countryside.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Farms",
                Icon = "http://localhost:5103/icons/farms.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Tiny homes",
                Icon = "http://localhost:5103/icons/tinyhomes.jpg"
            },
            new Core.Entities.Category
            {
                Name = "Tree houses",
                Icon = "http://localhost:5103/icons/treehouses.jpg"
            }
        );
        db.SaveChanges();
    }
}