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
            return _context.Routes.OrderBy(r => r.id).ToList();
        }
    }
}
