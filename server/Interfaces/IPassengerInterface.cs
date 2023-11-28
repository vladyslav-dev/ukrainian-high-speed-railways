using UHR.Models;

namespace UHR.Interfaces
{
    public interface IPassengerInterface
    {
        ICollection<Passenger> GetPassengers();

        ICollection<Passenger> AddPassengers(ICollection<Passenger> passengers);

        Passenger GetPassengerById(int id);
    }
}
