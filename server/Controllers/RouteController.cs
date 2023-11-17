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

        /// <summary>
        /// Get Route by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(UHR.Models.Route))]
        public IActionResult GetRouteById(int id)
        {
            var route = _routeInterface.GetRouteById(id);

            return Ok(route);
        }

        /// <summary>
        /// Create Routes
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<UHR.Models.Route>))]
        public ActionResult<UHR.Models.Route> AddRoutes([FromBody] ICollection<UHR.Models.Route> routes)
        {
            ICollection<UHR.Models.Route> createdRoutes = _routeInterface.AddRoutes(routes);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdRoutes);
        }
    }
}
