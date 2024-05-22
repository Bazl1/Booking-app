using System.ComponentModel.DataAnnotations;

namespace Booking.Core.Common;

public abstract class EntityBase
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
}