using UHR.Models;

namespace UHR.Interfaces
{
    public interface IDestinationInterface
    {
        ICollection<Destination> GetDestinations();

        ICollection<Destination> AddDestinations(ICollection<Destination> destinations);

        Destination GetDestinationById(int id);
    }
}

