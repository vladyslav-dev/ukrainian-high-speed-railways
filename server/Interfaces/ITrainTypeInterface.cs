using UHR.Models;

namespace UHR.Interfaces
{
    public interface ITrainTypeInterface
    {
        ICollection<TrainType> GetTrainTypes();
    }
}
