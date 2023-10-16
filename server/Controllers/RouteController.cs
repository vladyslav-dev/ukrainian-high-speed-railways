using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RouteController : ControllerBase
    {
        private readonly IRouteInterface _routeInterface;

        public RouteController(IRouteInterface routeInterface)
        {
            _routeInterface = routeInterface;
        }

        /// <summary>
        /// Gets all Routes
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UHR.Models.Route>))] 
        public IActionResult GetRoutes()
        {
            var routes = _routeInterface.GetRoutes();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(routes);
        }
    }
}
