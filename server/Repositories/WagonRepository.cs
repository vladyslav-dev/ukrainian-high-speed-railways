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
                    .ThenInclude(t => t.Routes)
                        .ThenInclude(r => r.Destination)
                            .ThenInclude(d => d.Origin_city)
                .Include(w => w.Train)
                    .ThenInclude(t => t.Routes)
                        .ThenInclude(r => r.Destination)
                            .ThenInclude(d => d.Destination_city)
                .Include(w => w.Train)
                    .ThenInclude(t => t.Type)
                .Include(w => w.Type)
                .OrderBy(w => w.Id).ToList();
        }

        public ICollection<Wagon> AddWagons(ICollection<Wagon> wagons)
        {
            foreach (var wagon in wagons)
            {
                _context.Wagons.Attach(wagon);
            }
            _context.Wagons.AddRange(wagons);
            _context.SaveChanges();
            return wagons;
        }

        public Wagon GetWagonById(int id)
        {
            return _context.Wagons
                .Include(w => w.Train)
                    .ThenInclude(t => t.Routes)
                        .ThenInclude(r => r.Destination)
                            .ThenInclude(d => d.Origin_city)
                .Include(w => w.Train)
                    .ThenInclude(t => t.Routes)
                        .ThenInclude(r => r.Destination)
                            .ThenInclude(d => d.Destination_city)
                .Include(w => w.Train)
                    .ThenInclude(t => t.Type)
                .Include(w => w.Type)
                .FirstOrDefault(w => w.Id == id);
        }
    }
}
