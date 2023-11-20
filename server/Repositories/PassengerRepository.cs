using Microsoft.EntityFrameworkCore;
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
            return _context.Passengers
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Trip)
                            .ThenInclude(t => t.Railway)
                                .ThenInclude(r => r.Origin_city)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Trip)
                            .ThenInclude(t => t.Railway)
                                .ThenInclude(r => r.Destination_city)
                .OrderBy(p => p.Id).ToList();
        }

        public ICollection<Passenger> AddPassengers(ICollection<Passenger> passengers)
        {
            foreach (var passenger in passengers)
            {
                _context.Passengers.Attach(passenger);
            }
            _context.Passengers.AddRange(passengers);
            _context.SaveChanges();
            return passengers;
        }

        public Passenger GetPassengerById(int id)
        {
            return _context.Passengers
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Trip)
                            .ThenInclude(t => t.Railway)
                                .ThenInclude(r => r.Origin_city)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Trip)
                            .ThenInclude(t => t.Railway)
                                .ThenInclude(r => r.Destination_city)
                .FirstOrDefault(p => p.Id == id);
        }
    }
}
