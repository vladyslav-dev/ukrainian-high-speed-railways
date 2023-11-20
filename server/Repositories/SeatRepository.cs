using Microsoft.EntityFrameworkCore;
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
            return _context.Seats
                 .Include(s => s.Wagon)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Type)
                 .Include(s => s.Wagon)
                    .ThenInclude(w => w.Type)
                 .Include(s => s.Trip)
                    .ThenInclude(t => t.Railway)
                        .ThenInclude(r => r.Origin_city)
                 .Include(s => s.Trip)
                    .ThenInclude(t => t.Railway)
                        .ThenInclude(r => r.Destination_city)
                 .OrderBy(s => s.Id).ToList();
        }

        public ICollection<Seat> AddSeats(ICollection<Seat> seats)
        {
            foreach (var seat in seats)
            {
                _context.Seats.Attach(seat);
            }
            _context.Seats.AddRange(seats);
            _context.SaveChanges();
            return seats;
        }

        public Seat GetSeatById(int id)
        {
            return _context.Seats
                 .Include(s => s.Wagon)
                    .ThenInclude(w => w.Train)
                       .ThenInclude(t => t.Type)
                 .Include(s => s.Wagon)
                    .ThenInclude(w => w.Type)
                 .Include(s => s.Trip)
                    .ThenInclude(t => t.Railway)
                       .ThenInclude(r => r.Origin_city)
                 .Include(s => s.Trip)
                    .ThenInclude(t => t.Railway)
                       .ThenInclude(r => r.Destination_city)
                 .FirstOrDefault(s => s.Id == id);
        }

        public ICollection<Seat> GetSeatsByTripsId(int[] ids)
        {
            return _context.Seats
                .Where(seat => ids.Contains(seat.Trip.Id))
                    .ToList();
        }
    }
}
