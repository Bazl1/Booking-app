using Booking.Application.Errors;
using Booking.Application.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Booking.Infrastructure.Services;

public class ImageService(
    IWebHostEnvironment env
) : IImageService
{
    public string Load(IFormFile file)
    {
        string fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
        string filePath = Path.Combine(env.WebRootPath, fileName);
        using FileStream fileStream = new FileStream(filePath, FileMode.Create);
        file.CopyTo(fileStream);
        fileStream.Close();
        return fileName;
    }

    public void Remove(string fileName)
    {
        string filePath = Path.Combine(env.WebRootPath, fileName);
        if (!File.Exists(filePath))
            throw new BookingError(
                BookingErrorType.NOT_FOUND,
                $"Image with this name {fileName} is not found"
            );
        File.Delete(filePath);
    }
}