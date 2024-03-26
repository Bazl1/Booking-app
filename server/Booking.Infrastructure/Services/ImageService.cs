using Booking.Application.Services;
using Microsoft.AspNetCore.Http;

namespace Booking.Infrastructure.Services;

public class ImageService : IImageService
{
    public string Load(IFormFile file)
    {
        throw new NotImplementedException();
    }

    public void Remove(string fileName)
    {
        throw new NotImplementedException();
    }
}