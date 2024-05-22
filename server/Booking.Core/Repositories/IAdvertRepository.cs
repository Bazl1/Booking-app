using Booking.Core.Common;
using Booking.Core.Entities;

namespace Booking.Core.Repositories;

public interface IAdvertRepository : IRepository<Advert>
{
    IEnumerable<Advert> Search(
        string? query = null,
        string? user = null,
        string? category = null,
        DateOnly? startDate = null,
        DateOnly? endDate = null,
        int? minCost = null,
        int? maxCost = null,
        int? singleBeds = null,
        int? doubleBeds = null,
        bool? wifi = null,
        bool? petsAllowed = null,
        bool? tv = null,
        bool? refrigerator = null,
        bool? kitchen = null,
        bool? washer = null,
        bool? heating = null,
        bool? dryer = null
    );
}