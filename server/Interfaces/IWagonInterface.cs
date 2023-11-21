using UHR.Models;

namespace UHR.Interfaces
{
    public interface IWagonInterface
    {
        ICollection<Wagon> GetWagons();

        ICollection<Wagon> AddWagons(ICollection<Wagon> wagons);

        Wagon GetWagonById(int id);
    }
}
