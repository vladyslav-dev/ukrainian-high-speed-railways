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
        /// Get City by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(City))]
        public IActionResult GetCityById(int id)
        {
            var city = _cityInterface.GetCityById(id);

            if (city == null)
                return NotFound();

            return Ok(city);
        }

        /// <summary>
        /// Create Cities
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<City>))]
        public ActionResult<City> AddCities([FromBody] ICollection<City> cities)
        {
            ICollection<City> createdCities = _cityInterface.AddCities(cities);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdCities);
        }
    }
}
