using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class TrainTypeRepository : ITrainTypeInterface
    {
        private readonly DataContext _context;

        public TrainTypeRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<TrainType> GetTrainTypes()
        {
            return _context.TrainTypes.OrderBy(tt => tt.Id).ToList();
        }

        public ICollection<TrainType> AddTrainTypes(ICollection<TrainType> trainTypes)
        {
            _context.AddRange(trainTypes);
            _context.SaveChanges();
            return trainTypes;
        }

        public TrainType GetTrainTypeById(int id)
        {
            return _context.TrainTypes.FirstOrDefault(tt => tt.Id == id);
        }
    }
}
