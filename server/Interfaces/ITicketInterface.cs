using UHR.Models;

namespace UHR.Interfaces
{
    public interface ITicketInterface
    {
        ICollection<Ticket> GetTickets();

        ICollection<Ticket> AddTickets(ICollection<Ticket> tickets);

        Ticket GetTicketById(int id);
    }
}
