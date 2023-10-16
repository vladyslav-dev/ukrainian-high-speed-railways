using UHR.Models;

namespace UHR.Interfaces
{
    public interface ISeatInterface
    {
        ICollection<Seat> GetSeats();
    }
}
