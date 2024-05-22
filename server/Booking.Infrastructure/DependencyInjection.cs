using System.Text;
using Booking.Core.Common;
using Booking.Core.Repositories;
using Booking.Application.Services;
using Booking.Infrastructure.Persistence;
using Booking.Infrastructure.Persistence.Repositories;
using Booking.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Hosting;
using Booking.Infrastructure.Options;

namespace Booking.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        services
            .AddJwtAuth(configuration)
            .AddDatabase(configuration, environment)

            .AddTransient<IUserRepository, UserRepository>()
            .AddTransient<IAdvertRepository, AdvertRepository>()
            .AddTransient<ICategoryRepository, CategoryRepository>()
            .AddTransient<IReviewRepository, ReviewRepository>()
            .AddTransient<IReservationRepository, ReservationRepository>()
            .AddTransient<IUnitOfWork, UnitOfWork>()

            .AddTransient<IPasswordHasher, PasswordHasher>()
            .AddTransient<IImageService, ImageService>()
            .AddTransient<ITokenGenerator, TokenGenerator>();
        return services;
    }

    private static IServiceCollection AddJwtAuth(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection(nameof(JwtOptions)));
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt =>
            {
                var tokenOptions = configuration.GetSection(nameof(JwtOptions)).Get<JwtOptions>();
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = true,
                    ValidateIssuer = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = tokenOptions.Issuer,
                    ValidAudience = tokenOptions.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenOptions.SecretKey))
                };
            });
        services.AddAuthorization();
        return services;
    }

    private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration, IWebHostEnvironment environment)
    {
        services.AddDbContext<BookingDbContext>(opt => opt.UseInMemoryDatabase("Booking.DB"));
        // services.AddDbContext<BookingDbContext>(opt => opt.UseSqlServer(configuration.GetConnectionString("SQL_SERVER_DB")));
        return services;
    }
}
