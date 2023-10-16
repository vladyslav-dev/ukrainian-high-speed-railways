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
            return _context.Cargos.OrderBy(c => c.id).ToList();
        }
    }
}
