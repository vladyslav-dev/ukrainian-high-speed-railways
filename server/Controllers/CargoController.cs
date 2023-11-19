using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CargoController : ControllerBase
    {
        private readonly ICargoInterface _cargoInterface;

        public CargoController(ICargoInterface cargoInterface)
        {
            _cargoInterface = cargoInterface;
        }

        /// <summary>
        /// Gets all Cargos
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Cargo>))]
        public IActionResult GetCargos()
        {
            var cargos = _cargoInterface.GetCargos();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(cargos);
        }

        /// <summary>
        /// Get Cargo by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Cargo))]
        public IActionResult GetCargoById(int id)
        {
            var cargo = _cargoInterface.GetCargoById(id);

            if (cargo == null)
                return NotFound();

            return Ok(cargo);
        }

        /// <summary>
        /// Create Cargos
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Cargo>))]
        public ActionResult<Cargo> AddDestinations([FromBody] ICollection<Cargo> cargos)
        {
            ICollection<Cargo> createdCargos = _cargoInterface.AddCargos(cargos);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdCargos);
        }
    }
}
