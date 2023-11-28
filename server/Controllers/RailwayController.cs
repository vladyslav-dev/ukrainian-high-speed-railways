using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RailwayController : ControllerBase
    {
        private readonly IRailwayInterface _railwayInterface;

        public RailwayController(IRailwayInterface railwayInterface)
        {
            _railwayInterface = railwayInterface;
        }

        /// <summary>
        /// Gets all Railways
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Railway>))]
        public IActionResult GetRailways()
        {
            var railways = _railwayInterface.GetRailways();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(railways);
        }

        /// <summary>
        /// Get Railway by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Railway))]
        public IActionResult GetRailwayById(int id)
        {
            var railway = _railwayInterface.GetRailwayById(id);

            if (railway == null)
                return NotFound();

            return Ok(railway);
        }

        /// <summary>
        /// Create Railways
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Railway>))]
        public ActionResult<Railway> AddRailways([FromBody] ICollection<Railway> railways)
        {
            ICollection<Railway> createdRailways = _railwayInterface.AddRailways(railways);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdRailways);
        }

    }
}
