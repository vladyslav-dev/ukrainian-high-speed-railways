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
            return _context.Tickets.OrderBy(t => t.Id).ToList();
        }
    }
}
