using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using System.Reflection;
using UHR.Data;
using UHR.Interfaces;
using UHR.Repositories;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          /* policy.WithOrigins("http://example.com",
                                               "http://www.contoso.com");*/
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

builder.Services.AddControllers();
builder.Services.AddScoped<ICargoInterface, CargoRepository>();
builder.Services.AddScoped<IRailwayInterface, RailwayRepository>();
builder.Services.AddScoped<IPassengerInterface, PassengerRepository>();
builder.Services.AddScoped<ITripInterface, TripRepository>();
builder.Services.AddScoped<ISeatInterface, SeatRepository>();
builder.Services.AddScoped<ITicketInterface, TicketRepository>();
builder.Services.AddScoped<ITrainInterface, TrainRepository>();
builder.Services.AddScoped<ITrainTypeInterface, TrainTypeRepository>();
builder.Services.AddScoped<IWagonInterface, WagonRepository>();
builder.Services.AddScoped<IWagonTypeInterface, WagonTypeRepository>();
builder.Services.AddScoped<ICityInterface, CityRepository>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "UHR API", Version = "v1" });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});
builder.Services.AddDbContext<DataContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(MyAllowSpecificOrigins);

app.Run();
