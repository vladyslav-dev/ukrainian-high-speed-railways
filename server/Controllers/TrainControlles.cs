using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly ITrainInterface _trainInterface;

        public TrainController(ITrainInterface trainInterface)
        {
            _trainInterface = trainInterface;
        }

        /// <summary>
        /// Gets all Trains
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Train>))]
        public IActionResult GetTrains()
        {
            var trains = _trainInterface.GetTrains();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trains);
        }

        /// <summary>
        /// Get Train by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Train))]
        public IActionResult GetTrainById(int id)
        {
            var train = _trainInterface.GetTrainById(id);

            if (train == null)
                return NotFound();

            return Ok(train);
        }

        /// <summary>
        /// Create Trains
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Train>))]
        public ActionResult<Train> AddTrains([FromBody] ICollection<Train> trains)
        {
            ICollection<Train> createdTrains = _trainInterface.AddTrains(trains);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdTrains);
        }
    }
}
