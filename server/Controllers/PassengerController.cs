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
    }
}
