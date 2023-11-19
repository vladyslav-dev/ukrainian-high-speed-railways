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

        /// <summary>
        /// Get WagonType by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(WagonType))]
        public IActionResult GetWagonTypeById(int id)
        {
            var wagonType = _wagonTypeInterface.GetWagonTypeById(id);

            if (wagonType == null)
                return NotFound();

            return Ok(wagonType);
        }

        /// <summary>
        /// Create WagonTypes
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<WagonType>))]
        public ActionResult<WagonType> AddWagonTypes([FromBody] ICollection<WagonType> wagonTypes)
        {
            ICollection<WagonType> createdWagonTypes = _wagonTypeInterface.AddWagonTypes(wagonTypes);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdWagonTypes);
        }

    }
}
