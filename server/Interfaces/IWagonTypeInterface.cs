using UHR.Models;

namespace UHR.Interfaces
{
    public interface IWagonTypeInterface
    {
        ICollection<WagonType> GetWagonTypes();

        ICollection<WagonType> AddWagonTypes(ICollection<WagonType> wagonTypes);

        WagonType GetWagonTypeById(int id);
    }
}
