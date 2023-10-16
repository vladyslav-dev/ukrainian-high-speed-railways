using UHR.Models;

namespace UHR.Interfaces
{
    public interface IPassengerInterface
    {
        ICollection<Passenger> GetPassengers();
    }
}
