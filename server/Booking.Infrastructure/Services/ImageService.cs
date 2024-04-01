using System.Security.Cryptography;
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
        return fileName;
    }

    public string LoadFromBase64(string fileInBase64)
    {
        var file = Convert.FromBase64String(fileInBase64);
        var extension = fileInBase64.Substring(0, 5) switch
        {
            "IVBOR" => "png",
            "/9J/4" => "jpg",
            _ => throw new BookingError(
                BookingErrorType.VALIDATION_ERROR,
                "Invalid file type"
            ),
        };
        string fileName = $"{Guid.NewGuid()}{extension}";
        string filePath = Path.Combine(env.WebRootPath, fileName);
        using FileStream fileStream = new FileStream(filePath, FileMode.Create);
        using MemoryStream memoryStream = new MemoryStream(file);
        memoryStream.CopyTo(fileStream);
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