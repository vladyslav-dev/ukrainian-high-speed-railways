using UHR.Models;

namespace UHR.Interfaces
{
    public interface ICargoInterface
    {
        ICollection<Cargo> GetCargos();
    }
}
