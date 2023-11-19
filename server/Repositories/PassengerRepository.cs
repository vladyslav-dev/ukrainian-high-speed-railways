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
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Routes)
                                    .ThenInclude(r => r.Destination)
                                        .ThenInclude(d => d.Origin_city)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Routes)
                                    .ThenInclude(r => r.Destination)
                                        .ThenInclude(d => d.Destination_city)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Type)
                .OrderBy(p => p.Id).ToList();
        }

        public ICollection<Passenger> AddPassengers(ICollection<Passenger> passengers)
        {
            _context.Passengers.AddRange(passengers);
            _context.SaveChanges();
            return passengers;
        }

        public Passenger GetPassengerById(int id)
        {
            return _context.Passengers
                .Include(p => p.Ticket)
                .FirstOrDefault(p => p.Id == id);
        }
    }
}
