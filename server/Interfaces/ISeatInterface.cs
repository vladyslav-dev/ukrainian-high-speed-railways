using UHR.Models;

namespace UHR.Interfaces
{
    public interface ISeatInterface
    {
        ICollection<Seat> GetSeats();

        ICollection<Seat> AddSeats(ICollection<Seat> seats);

        Seat GetSeatById(int id);
    }
}
