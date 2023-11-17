using UHR.Models;

namespace UHR.Interfaces
{
    public interface ICargoInterface
    {
        ICollection<Cargo> GetCargos();

        ICollection<Cargo> AddCargos(ICollection<Cargo> newCargo);

        Cargo GetCargoById(int id);
    }
}
