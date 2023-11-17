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
            return _context.Cargos.OrderBy(c => c.Id).ToList();
        }

        public ICollection<Cargo> AddCargos(ICollection<Cargo> cargos)
        {
            _context.Cargos.AddRange(cargos);
            _context.SaveChanges();
            return cargos;
        }

        public Cargo GetCargoById(int id)
        {
            return _context.Cargos
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Routes)
                            .ThenInclude(r => r.Destination)
                                .ThenInclude(d => d.Origin_city)
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Routes)
                            .ThenInclude(r => r.Destination)
                                .ThenInclude(d => d.Destination_city)
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Train)
                        .ThenInclude(t => t.Type)
                .Include(c => c.Wagons)
                    .ThenInclude(w => w.Type)
                .FirstOrDefault(c => c.Id == id);
        }
    }
}
