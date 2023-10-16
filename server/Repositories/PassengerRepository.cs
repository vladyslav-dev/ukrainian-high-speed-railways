using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class PassengerRepository : IPassengerInterface
    {
        private readonly DataContext _context;

        public PassengerRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Passenger> GetPassengers()
        {
            return _context.Passengers.OrderBy(p => p.id).ToList();
        }
    }
}
