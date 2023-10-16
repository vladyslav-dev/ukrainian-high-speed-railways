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
        [ProducesResponseType(200, Type = typeof(IEnumerable<Destination>))]
        public IActionResult GetDestinations()
        {
            var destinations = _destinationInterface.GetDestinations();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(destinations);
        }
    }
}
