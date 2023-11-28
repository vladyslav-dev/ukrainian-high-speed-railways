using UHR.Models;

namespace UHR.Interfaces
{
    public interface IRailwayInterface
    {
        ICollection<Railway> GetRailways();

        ICollection<Railway> AddRailways(ICollection<Railway> railways);

        Railway GetRailwayById(int id);
    }
}

