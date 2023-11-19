using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class RouteRepository : IRouteInterface
    {
        private readonly DataContext _context;

        public RouteRepository(DataContext context)
        {
            _context = context; 
        }

        public ICollection<UHR.Models.Route> GetRoutes()
        {
            return _context.Routes
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Origin_city)
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Destination_city)
                .OrderBy(r => r.Id).ToList();
        }

        public ICollection<UHR.Models.Route> AddRoutes(ICollection<UHR.Models.Route> routes)
        {
            foreach (var route in routes)
            {
                _context.Routes.Attach(route);
            }
            _context.Routes.AddRange(routes);
            _context.SaveChanges();
            return routes;
        }

        public UHR.Models.Route GetRouteById(int id)
        {
            return _context.Routes
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Origin_city)
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Destination_city)
                .FirstOrDefault(r => r.Id == id);
        }

        public ICollection<UHR.Models.Route> GetRoutesByQueries(string fromCity, string toCity, string fromDate, string? toDate)
        {
            var routes = _context.Routes
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Origin_city)
                .Include(r => r.Destination)
                    .ThenInclude(d => d.Destination_city)
                .Where(r => r.Destination.Origin_city.Name == fromCity && r.Destination.Destination_city.Name == toCity);

            if (!string.IsNullOrEmpty(toDate))
            {
                
                routes = routes.Where(r => r.Departure_date >= DateTime.Parse(fromDate).ToUniversalTime() && r.Arrival_date <= DateTime.Parse(toDate).ToUniversalTime());
            }
            else
            {
                routes = routes.Where(r => r.Departure_date >= DateTime.Parse(fromDate).ToUniversalTime());
            }
            return routes.OrderBy(r => r.Id).ToList();
        }
    }
}
