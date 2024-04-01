using Microsoft.AspNetCore.Http;

namespace Booking.Application.Services;

public interface IImageService
{
    string Load(IFormFile file);
    string LoadFromBase64(string fileInBase64);
    void Remove(string fileName);
}