using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace UHR.Repositories
{
    public class DestinationRepository : IDestinationInterface
    {
        private readonly DataContext _context;

        public DestinationRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Destination> GetDestinations()
        {
            return _context.Destinations
                .Include(d => d.Origin_city)
                .Include(d => d.Destination_city)
                .OrderBy(d => d.Id).ToList();
        }

        public ICollection<Destination> AddDestinations(ICollection<Destination> destinations)
        {
            foreach (var destination in destinations)
            {
                _context.Destinations.Attach(destination);
            }
            _context.Destinations.AddRange(destinations);
            _context.SaveChanges();
            return destinations;
        }

        public Destination GetDestinationById(int id)
        {
            return _context.Destinations
                .Include(d => d.Origin_city)
                .Include(d => d.Destination_city)
                .FirstOrDefault(d => d.Id == id);
        }
    }
}

