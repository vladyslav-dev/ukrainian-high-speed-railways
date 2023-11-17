using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class SeatRepository : ISeatInterface
    {
        private readonly DataContext _context;

        public SeatRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Seat> GetSeats()
        {
            return _context.Seats.OrderBy(s => s.Id).ToList();
        }
    }
}
