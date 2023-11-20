using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace UHR.Repositories
{
    public class RailwayRepository : IRailwayInterface
    {
        private readonly DataContext _context;

        public RailwayRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Railway> GetRailways()
        {
            return _context.Railways
                //.Include(r => r.Origin_city)
                //.Include(r => r.Destination_city)
                .OrderBy(r => r.Id).ToList();
        }

        public ICollection<Railway> AddRailways(ICollection<Railway> railways)
        {
            foreach (var railway in railways)
            {
                var existingOriginCity = _context.Cities.Find(railway.Origin_city.Id);
                var existingDestinationCity = _context.Cities.Find(railway.Destination_city.Id);

                if (existingOriginCity != null)
                {
                    railway.Origin_city = existingOriginCity;
                }

                if (existingDestinationCity != null)
                {
                    railway.Destination_city = existingDestinationCity;
                }

                _context.Railways.Add(railway);
            }

            _context.SaveChanges();

            return railways;
        }

        public Railway GetRailwayById(int id)
        {
            return _context.Railways
                //.Include(r => r.Origin_city)
                //.Include(r => r.Destination_city)
                .FirstOrDefault(r => r.Id == id);
        }
    }
}

