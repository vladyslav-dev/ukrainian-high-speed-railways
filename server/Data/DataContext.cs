using Microsoft.EntityFrameworkCore;
using UHR.Models;

namespace UHR.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { 
            
        }

        public DbSet<Cargo> Cargos { get; set; }
        public DbSet<Railway> Railways { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Train> Trains { get; set; }
        public DbSet<TrainType> TrainTypes { get; set; }
        public DbSet<Wagon> Wagons { get; set; }
        public DbSet<WagonType> WagonTypes { get; set; }
        public DbSet<City> Cities { get; set; }
    }
}
