using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainTypeController : ControllerBase
    {
        private readonly ITrainTypeInterface _trainTypeInterface;

        public TrainTypeController(ITrainTypeInterface trainTypeInterface)
        {
            _trainTypeInterface = trainTypeInterface;
        }

        /// <summary>
        /// Gets all TrainTypes
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<TrainType>))]
        public IActionResult GetTrainTypes()
        {
            var trainTypes = _trainTypeInterface.GetTrainTypes();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trainTypes);
        }

        /// <summary>
        /// Get TrainType by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(TrainType))]
        public IActionResult GetTrainTypeById(int id)
        {
            var trainType = _trainTypeInterface.GetTrainTypeById(id);

            if (trainType == null)
                return NotFound();

            return Ok(trainType);
        }

        /// <summary>
        /// Create TrainTypes
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<TrainType>))]
        public ActionResult<TrainType> AddTrainTypes([FromBody] ICollection<TrainType> trainTypes)
        {
            ICollection<TrainType> createdTrainTypes = _trainTypeInterface.AddTrainTypes(trainTypes);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdTrainTypes);
        }
    }
}
