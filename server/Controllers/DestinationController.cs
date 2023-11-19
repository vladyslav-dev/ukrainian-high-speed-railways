using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly IDestinationInterface _destinationInterface;

        public DestinationController(IDestinationInterface destinationInterface)
        {
            _destinationInterface = destinationInterface;
        }

        /// <summary>
        /// Gets all Destinations
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Destination>))]
        public IActionResult GetDestinations()
        {
            var destinations = _destinationInterface.GetDestinations();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(destinations);
        }

        /// <summary>
        /// Get Destination by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Destination))]
        public IActionResult GetDestinationById(int id)
        {
            var destination = _destinationInterface.GetDestinationById(id);

            if (destination == null)
                return NotFound();

            return Ok(destination);
        }

        /// <summary>
        /// Create Destinations
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Destination>))]
        public ActionResult<Destination> AddDestinations([FromBody] ICollection<Destination> destinations)
        {
            ICollection<Destination> createdDestinations = _destinationInterface.AddDestinations(destinations);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdDestinations);
        }

    }
}
