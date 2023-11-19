using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly ITicketInterface _ticketInterface;

        public TicketController(ITicketInterface ticketInterface)
        {
            _ticketInterface = ticketInterface;
        }

        /// <summary>
        /// Gets all Tickets
        /// </summary>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(ICollection<Ticket>))]
        public IActionResult GetTickets()
        {
            var tickets = _ticketInterface.GetTickets();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(tickets);
        }
    }
}
