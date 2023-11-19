using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;

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
                .OrderBy(r => r.Id).ToList();
        }

        public ICollection<UHR.Models.Route> AddRoutes(ICollection<UHR.Models.Route> routes)
        {
            _context.Routes.AddRange(routes);
            _context.SaveChanges();
            return routes;
        }

        public UHR.Models.Route GetRouteById(int id)
        {
            return _context.Routes
                .Include(r => r.Destination)
                .FirstOrDefault(r => r.Id == id);
        }
    }
}
