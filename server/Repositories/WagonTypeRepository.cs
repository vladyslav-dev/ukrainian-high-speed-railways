using Microsoft.EntityFrameworkCore;
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
            return _context.WagonTypes.OrderBy(wt => wt.Id).ToList();
        }

        public ICollection<WagonType> AddWagonTypes(ICollection<WagonType> wagonTypes)
        {
            foreach (var wagonType in wagonTypes)
            {
                _context.WagonTypes.Attach(wagonType);
            }
            _context.WagonTypes.AddRange(wagonTypes);
            _context.SaveChanges();
            return wagonTypes;
        }

        public WagonType GetWagonTypeById(int id)
        {
            return _context.WagonTypes.FirstOrDefault(wt => wt.Id == id);
        }

    }
}
