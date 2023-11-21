using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase
    {
        private readonly ITripInterface _tripInterface;
        public TripController(ITripInterface tripInterface)
        {
            _tripInterface = tripInterface;
        }

        /// <summary>
        /// Gets all Trips
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Trip>))] 
        public IActionResult GetTrips()
        {
            var trips = _tripInterface.GetTrips();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trips);
        }

        /// <summary>
        /// Get Trip by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Trip))]
        public IActionResult GetTripById(int id)
        {
            var trip = _tripInterface.GetTripById(id);

            if (trip == null)
                return NotFound();

            return Ok(trip);
        }

        /// <summary>
        /// Create Trips
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Trip>))]
        public ActionResult<Trip> AddTrips([FromBody] ICollection<Trip> trips)
        {
            ICollection<Trip> createdTrips = _tripInterface.AddTrips(trips);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdTrips);
        }

        /// <summary>
        /// Gets all Trips By Query Params
        /// </summary>
        [HttpGet("search")]
        [ProducesResponseType(200, Type = typeof(ICollection<Trip>))]
        public IActionResult GetTripsByQueries([FromQuery] string originCity, [FromQuery] string destinationCity, [FromQuery] string fromDate, [FromQuery] string? toDate)
        {
            var trips = _tripInterface.GetTripsByQueries(originCity, destinationCity, fromDate, toDate);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trips);
        }

        /// <summary>
        /// Get TripsInfos by Trips ids
        /// </summary>
        /// 
        [HttpPost("TripsInfosByTripsIds")]
        [ProducesResponseType(200, Type = typeof(List<SearchResponse>))]
        public ActionResult<List<SearchResponse>> GetSeatsByTripsId([FromBody] int[] ids)
        {
            List<SearchResponse> searchResponse = _tripInterface.GetTripsInfosByTripsIds(ids);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (searchResponse.Count == 0)
                return NotFound();

            return Ok(searchResponse);
        }
    }
}
