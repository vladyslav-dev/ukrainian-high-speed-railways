using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class TrainRepository : ITrainInterface
    {
        private readonly DataContext _context;

        public TrainRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Train> GetTrains()
        {
            return _context.Trains.OrderBy(t => t.id).ToList();
        }
    }
}
