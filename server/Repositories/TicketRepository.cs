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
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Routes)
                //                .ThenInclude(r => r.Destination)
                //                    .ThenInclude(d => d.Origin_city)
                //.Include(t => t.Seat)
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Routes)
                //                .ThenInclude(r => r.Destination)
                //                    .ThenInclude(d => d.Destination_city)
                //.Include(t => t.Seat)
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Type)
                //.Include(t => t.Seat)
                //     .ThenInclude(s => s.Wagon)
                //         .ThenInclude(w => w.Type)
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
                //.Include(t => t.Seat)
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Routes)
                //                .ThenInclude(r => r.Destination)
                //                    .ThenInclude(d => d.Origin_city)
                //.Include(t => t.Seat)
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Routes)
                //                .ThenInclude(r => r.Destination)
                //                    .ThenInclude(d => d.Destination_city)
                //.Include(t => t.Seat)
                //    .ThenInclude(s => s.Wagon)
                //        .ThenInclude(w => w.Train)
                //            .ThenInclude(t => t.Type)
                //.Include(t => t.Seat)
                //     .ThenInclude(s => s.Wagon)
                //         .ThenInclude(w => w.Type)
                .FirstOrDefault(t => t.Id == id);
        }
    }
}
