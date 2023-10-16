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
            return _context.TrainTypes.OrderBy(tt => tt.id).ToList();
        }
    }
}
