using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagonController : ControllerBase
    {
        private readonly IWagonInterface _wagonInterface;

        public WagonController(IWagonInterface wagonInterface)
        {
            _wagonInterface = wagonInterface;
        }

        /// <summary>
        /// Gets all Wagons
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Wagon>))]
        public IActionResult GetWagons()
        {
            var wagons = _wagonInterface.GetWagons();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(wagons);
        }
    }
}
