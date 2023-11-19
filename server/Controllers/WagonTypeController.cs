using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WagonTypeController : ControllerBase
    {
        private readonly IWagonTypeInterface _wagonTypeInterface;

        public WagonTypeController(IWagonTypeInterface wagonTypeInterface)
        {
            _wagonTypeInterface = wagonTypeInterface;
        }

        /// <summary>
        /// Gets all WagonTypes
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<WagonType>))]
        public IActionResult GetWagonTypes()
        {
            var wagonTypes = _wagonTypeInterface.GetWagonTypes();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(wagonTypes);
        }
    }
}
