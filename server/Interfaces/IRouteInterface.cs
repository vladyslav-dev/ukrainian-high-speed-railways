using Microsoft.AspNetCore.Mvc;

namespace UHR.Interfaces
{
    public interface IRouteInterface
    {
        ICollection<UHR.Models.Route> GetRoutes();

        ICollection<UHR.Models.Route> AddRoutes(ICollection<UHR.Models.Route> routes);

        UHR.Models.Route GetRouteById(int id);
    }
}
