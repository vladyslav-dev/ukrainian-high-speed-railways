using Microsoft.EntityFrameworkCore;
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
            return _context.Trains
                .Include(t => t.Type)
                .OrderBy(t => t.Id).ToList();
        }

        public ICollection<Train> AddTrains(ICollection<Train> trains)
        {
            foreach (var train in trains)
            {
                var existingTrainType = _context.TrainTypes.Find(train.Type.Id);

                if (existingTrainType != null)
                {
                    train.Type = existingTrainType;
                }

                _context.Trains.Add(train);
            }

            _context.SaveChanges();
            return trains;
        }

        public Train GetTrainById(int id)
        {
            return _context.Trains
                .Include(t => t.Type)
                .FirstOrDefault(t => t.Id == id);
        }
    }
}
