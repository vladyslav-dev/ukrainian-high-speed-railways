using UHR.Models;

namespace UHR.Interfaces
{
    public interface ITicketInterface
    {
        ICollection<Ticket> GetTickets();
    }
}
