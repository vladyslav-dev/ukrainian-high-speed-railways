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
        public DbSet<Destination> Destinations { get; set; }
        public DbSet<Passenger> Passengers { get; set; }
        public DbSet<UHR.Models.Route> Routes { get; set; }
        public DbSet<Seat> Seats { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Train> Trains { get; set; }
        public DbSet<TrainType> TrainTypes { get; set; }
        public DbSet<Wagon> Wagons { get; set; }
        public DbSet<WagonType> WagonTypes { get; set; }
    }
}
