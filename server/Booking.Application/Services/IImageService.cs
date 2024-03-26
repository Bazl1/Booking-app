using Microsoft.AspNetCore.Http;

namespace Booking.Application.Services;

public interface IImageService
{
    string Load(IFormFile file);
    void Remove(string fileName);
}