using Booking.Api.Middlewares;
using Booking.Application;
using Booking.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Layers
builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);

// Add cors
builder.Services.AddCors(opt => opt.AddDefaultPolicy(policy => policy
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ErrorHandlingMiddleware>();
app.UseCors();
app.UseStaticFiles();
app.MapControllers();

app.Run();