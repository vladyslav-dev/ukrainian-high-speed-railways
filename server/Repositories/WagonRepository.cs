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
            return _context.Wagons.OrderBy(w => w.Id).ToList();
        }
    }
}
