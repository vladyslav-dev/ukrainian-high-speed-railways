using UHR.Models;

namespace UHR.Interfaces
{
    public interface IWagonTypeInterface
    {
        ICollection<WagonType> GetWagonTypes();
    }
}
