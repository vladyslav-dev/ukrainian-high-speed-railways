using UHR.Models;

namespace UHR.Interfaces
{
    public interface IWagonInterface
    {
        ICollection<Wagon> GetWagons();
    }
}
