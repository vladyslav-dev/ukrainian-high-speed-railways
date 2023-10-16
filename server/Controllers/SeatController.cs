using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatController : ControllerBase
    {
        private readonly ISeatInterface _seatInterface;

        public SeatController(ISeatInterface seatInterface)
        {
            _seatInterface = seatInterface;
        }

        /// <summary>
        /// Gets all Seats
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Seat>))]
        public IActionResult GetSeats()
        {
            var seats = _seatInterface.GetSeats();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(seats);
        }
    }
}
