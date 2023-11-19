using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController: ControllerBase
    {
        private readonly ICityInterface _cityInterface;

        public CityController(ICityInterface cityInterface)
        {
            _cityInterface = cityInterface;
        }

        /// <summary>
        /// Gets all Cities
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<City>))]
        public IActionResult GetCities()
        {
            var cities = _cityInterface.GetCities();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(cities);
        }

        /// <summary>
        /// Create City
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<City>))]
        public ActionResult<City> AddRoutes([FromBody] ICollection<City> cities)
        {
            ICollection<City> createdCities = _cityInterface.AddCities(cities);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdCities);
        }
    }
}
