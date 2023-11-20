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
            foreach(var cargo in cargos)
            {
                _context.Cargos.Attach(cargo);
            }
            _context.Cargos.AddRange(cargos);
            _context.SaveChanges();
            return cargos;
        }

        public Cargo GetCargoById(int id)
        {
            return _context.Cargos.FirstOrDefault(c => c.Id == id);
        }
    }
}
