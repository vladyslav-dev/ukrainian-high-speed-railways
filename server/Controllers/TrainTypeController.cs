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
        [ProducesResponseType(200, Type = typeof(IEnumerable<TrainType>))]
        public IActionResult GetTrainTypes()
        {
            var trainTypes = _trainTypeInterface.GetTrainTypes();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trainTypes);
        }
    }
}
