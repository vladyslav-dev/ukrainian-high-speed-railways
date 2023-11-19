using UHR.Models;

namespace UHR.Interfaces
{
    public interface ITrainTypeInterface
    {
        ICollection<TrainType> GetTrainTypes();

        ICollection<TrainType> AddTrainTypes(ICollection<TrainType> trainTypes);

        TrainType GetTrainTypeById(int id);
    }
}
