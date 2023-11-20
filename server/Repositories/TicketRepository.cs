using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class TicketRepository : ITicketInterface
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Ticket> GetTickets()
        {
            return _context.Tickets
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Train)
                            .ThenInclude(t => t.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Origin_city)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Destination_city)
                .OrderBy(t => t.Id).ToList();
        }

        public ICollection<Ticket> AddTickets(ICollection<Ticket> tickets)
        {
            foreach (var ticket in tickets)
            {
                _context.Tickets.Attach(ticket);
            }
            _context.Tickets.AddRange(tickets);
            _context.SaveChanges();
            return tickets;
        }

        public Ticket GetTicketById(int id)
        {
            return _context.Tickets
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Train)
                            .ThenInclude(t => t.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Origin_city)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Destination_city)
                .FirstOrDefault(t => t.Id == id);
        }
    }
}
