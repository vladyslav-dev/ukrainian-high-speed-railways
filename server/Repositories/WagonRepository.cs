using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class WagonRepository : IWagonInterface
    {
        private readonly DataContext _context;

        public WagonRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Wagon> GetWagons()
        {
            return _context.Wagons
                .Include(w => w.Train)
                    .ThenInclude(t => t.Type)
                .Include(w => w.Type)
                .OrderBy(w => w.Id).ToList();
        }

        public ICollection<Wagon> AddWagons(ICollection<Wagon> wagons)
        {
            foreach (var wagon in wagons)
            {
                var existingTrain = _context.Trains.Find(wagon.Train.Id);
                var existingTrainType = _context.TrainTypes.Find(wagon.Train.Type.Id);
                var existingType = _context.WagonTypes.Find(wagon.Type.Id);

                if (existingTrain != null)
                {
                    wagon.Train = existingTrain;
                }

                if (existingTrainType != null)
                {
                    wagon.Train.Type = existingTrainType;
                }

                if (existingType != null)
                {
                    wagon.Type = existingType;
                }

                _context.Wagons.Add(wagon);
            }

            _context.SaveChanges();
            return wagons;
        }

        public Wagon GetWagonById(int id)
        {
            return _context.Wagons
                .Include(w => w.Train)
                    .ThenInclude(t => t.Type)
                .Include(w => w.Type)
                .FirstOrDefault(w => w.Id == id);
        }
    }
}

