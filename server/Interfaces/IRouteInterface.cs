using Microsoft.AspNetCore.Mvc;
using UHR.Models;

namespace UHR.Interfaces
{
    public interface IRouteInterface
    {
        ICollection<UHR.Models.Route> GetRoutes();

        ICollection<UHR.Models.Route> AddRoutes(ICollection<UHR.Models.Route> routes);

        UHR.Models.Route GetRouteById(int id);

        ICollection<UHR.Models.Route> GetRoutesByQueries(string fromCity, string toCity, string fromDate, string? toDate);
    }
}
