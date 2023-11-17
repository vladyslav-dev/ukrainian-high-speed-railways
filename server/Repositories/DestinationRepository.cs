using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

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
            return _context.Destinations.OrderBy(d => d.Id).ToList();
        }
    }
}

