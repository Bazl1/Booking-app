namespace Booking.Core.Common;

public abstract class EntityBase
{
    public string Id { get; private set; }

    public EntityBase(string id)
    {
        Id = id;
    }
}