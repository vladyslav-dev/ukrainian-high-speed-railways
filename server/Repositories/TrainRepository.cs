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
                //.Include(t => t.Routes)
                //    .ThenInclude(r => r.Destination)
                //        .ThenInclude(d => d.Origin_city)
                //.Include(t => t.Routes)
                //    .ThenInclude(r => r.Destination)
                //        .ThenInclude(d => d.Destination_city)
                //.Include(t => t.Type)
                .OrderBy(t => t.Id).ToList();
        }

        public ICollection<Train> AddTrains(ICollection<Train> trains)
        {
            foreach (var train in trains)
            {
                _context.Trains.Attach(train);
            }
            _context.Trains.AddRange(trains);
            _context.SaveChanges();
            return trains;
        }

        public Train GetTrainById(int id)
        {
            return _context.Trains
                //.Include(t => t.Routes)
                //    .ThenInclude(r => r.Destination)
                //        .ThenInclude(d => d.Origin_city)
                //.Include(t => t.Routes)
                //    .ThenInclude(r => r.Destination)
                //        .ThenInclude(d => d.Destination_city)
                //.Include(t => t.Type)
                .FirstOrDefault(t => t.Id == id);
        }
    }
}
