using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class WagonTypeRepository : IWagonTypeInterface
    {
        private readonly DataContext _context;

        public WagonTypeRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<WagonType> GetWagonTypes()
        {
            return _context.WagonTypes.OrderBy(wt => wt.id).ToList();
        }
    }
}
