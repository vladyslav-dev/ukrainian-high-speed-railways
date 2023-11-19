using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PassengerController : ControllerBase
    {
        private readonly IPassengerInterface _passengerInterface;

        public PassengerController(IPassengerInterface passengerInterface)
        {
            _passengerInterface = passengerInterface;
        }

        /// <summary>
        /// Gets all Passengers
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Passenger>))]
        public IActionResult GetPassengers()
        {
            var passengers = _passengerInterface.GetPassengers();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(passengers);
        }

        /// <summary>
        /// Get Passanger by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Passenger))]
        public IActionResult GetPassengerById(int id)
        {
            var passenger = _passengerInterface.GetPassengerById(id);

            if (passenger == null)
                return NotFound();

            return Ok(passenger);
        }

        /// <summary>
        /// Create Passangers
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Passenger>))]
        public ActionResult<Passenger> AddPassenger([FromBody] ICollection<Passenger> passengers)
        {
            ICollection<Passenger> createdPassengers = _passengerInterface.AddPassengers(passengers);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdPassengers);
        }
    }
}
