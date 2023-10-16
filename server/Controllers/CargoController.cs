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
        [ProducesResponseType(200, Type = typeof(IEnumerable<Cargo>))]
        public IActionResult GetCargos()
        {
            var cargos = _cargoInterface.GetCargos();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(cargos);
        }
    }
}
