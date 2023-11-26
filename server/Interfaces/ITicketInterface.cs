using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Interfaces
{
    public interface ITicketInterface
    {
        ICollection<Ticket> GetTickets();

        ICollection<Ticket> AddTickets(ICollection<Ticket> tickets);

        Ticket GetTicketById(int id);

        ICollection<BuyTicketResponse> BuyTickets(List<BuyTicketResponse> purchasedTicketsData);
    }
}
