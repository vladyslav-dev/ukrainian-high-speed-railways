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
        [ProducesResponseType(200, Type = typeof(IEnumerable<Train>))]
        public IActionResult GetTrains()
        {
            var trains = _trainInterface.GetTrains();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(trains);
        }
    }
}
