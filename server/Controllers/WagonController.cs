using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagonController : ControllerBase
    {
        private readonly IWagonInterface _wagonInterface;

        public WagonController(IWagonInterface wagonInterface)
        {
            _wagonInterface = wagonInterface;
        }

        /// <summary>
        /// Gets all Wagons
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Wagon>))]
        public IActionResult GetWagons()
        {
            var wagons = _wagonInterface.GetWagons();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(wagons);
        }

        /// <summary>
        /// Get Wagon by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Wagon))]
        public IActionResult GetWagonById(int id)
        {
            var wagon = _wagonInterface.GetWagonById(id);

            if (wagon == null)
                return NotFound();

            return Ok(wagon);
        }

        /// <summary>
        /// Create Wagons
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Wagon>))]
        public ActionResult<Wagon> AddWagons([FromBody] ICollection<Wagon> wagons)
        {
            ICollection<Wagon> createdWagons = _wagonInterface.AddWagons(wagons);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdWagons);
        }

        /// <summary>
        /// Get Wagons by Seats ids
        /// </summary>
        /// 
        [HttpPost("WagonsBySeatsIds")]
        [ProducesResponseType(200, Type = typeof(ICollection<Wagon>))]
        public ActionResult<ICollection<Wagon>> GetWagonsBySeatsIds([FromBody] int[] ids)
        {
            ICollection<Wagon> filteredWagons = _wagonInterface.GetWagonsBySeatsIds(ids);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (filteredWagons.Count == 0)
                return NotFound();

            return Ok(filteredWagons);
        }
    }
}
