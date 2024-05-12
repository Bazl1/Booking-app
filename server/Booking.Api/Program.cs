using Booking.Api.Middlewares;
using Booking.Application;
using Booking.Infrastructure;
using Booking.Infrastructure.Persistence.Seeds;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.FullName);
});

// Add Layers
builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration, builder.Environment);

builder.Services
    .AddHttpContextAccessor()
    .AddControllers();

// Add cors
builder.Services.AddCors(opt => opt.AddDefaultPolicy(policy => policy
    .WithOrigins("http://localhost:5173")
    .AllowCredentials()
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    // Seeds
    using var scope = app.Services.CreateScope();
    CategorySeed.Seed(scope.ServiceProvider);

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();