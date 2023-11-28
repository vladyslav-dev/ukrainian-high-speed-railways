using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class CargoRepository : ICargoInterface
    {
        private readonly DataContext _context;

        public CargoRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Cargo> GetCargos()
        {
            return _context.Cargos
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Type)
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Type)
                .OrderBy(c => c.Id).ToList();
        }

        public ICollection<Cargo> AddCargos(ICollection<Cargo> cargos)
        {
            foreach(var cargo in cargos)
            {    
                foreach(var wagon in cargo.Wagons) 
                {
                    var existingTrain = _context.Trains.Find(wagon.Train.Id);
                    var existingTrainType = _context.TrainTypes.Find(wagon.Train.Type.Id);
                    var existingWagonType = _context.WagonTypes.Find(wagon.Type.Id);

                    if(existingTrain != null) 
                    {
                        wagon.Train = existingTrain;
                    }

                    if(existingTrainType != null) 
                    {
                        wagon.Train.Type = existingTrainType;
                    }

                    if(existingWagonType != null)
                    {
                        wagon.Type = existingWagonType;
                    }
                }

                _context.Cargos.Add(cargo);
            }

            _context.SaveChanges();
            return cargos;
        }

        public Cargo GetCargoById(int id)
        {
            return _context.Cargos
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Type)
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Type)
                .FirstOrDefault(c => c.Id == id);
        }
    }
}
