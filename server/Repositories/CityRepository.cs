using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class CityRepository : ICityInterface
    {
        private readonly DataContext _context;

        public CityRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<City> GetCities()
        {
            return _context.Cities.OrderBy(c => c.Id).ToList();
        }

        public ICollection<City> AddCities(ICollection<City> cities)
        {
            _context.Cities.AddRange(cities);
            _context.SaveChanges();
            return cities;
        }
    }
}
