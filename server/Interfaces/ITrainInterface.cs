using UHR.Models;

namespace UHR.Interfaces
{
    public interface ITrainInterface
    {
        ICollection<Train> GetTrains();

        ICollection<Train> AddTrains(ICollection<Train> trains);

        Train GetTrainById(int id);
    }
}
