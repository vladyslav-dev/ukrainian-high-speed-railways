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
        [ProducesResponseType(200, Type = typeof(ICollection<Seat>))]
        public IActionResult GetSeats()
        {
            var seats = _seatInterface.GetSeats();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(seats);
        }

        /// <summary>
        /// Get Seat by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Seat))]
        public IActionResult GetSeatById(int id)
        {
            var seat = _seatInterface.GetSeatById(id);

            if (seat == null)
                return NotFound();

            return Ok(seat);
        }

        /// <summary>
        /// Create Seats
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Seat>))]
        public ActionResult<Seat> AddSeats([FromBody] ICollection<Seat> seats)
        {
            ICollection<Seat> createdSeats = _seatInterface.AddSeats(seats);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdSeats);
        }
    }
}
