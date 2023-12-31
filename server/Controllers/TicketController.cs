﻿using Microsoft.AspNetCore.Mvc;
using UHR.Interfaces;
using UHR.Models;
using UHR.ResponsesEntities;

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

        /// <summary>
        /// Get Ticket by id
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Ticket))]
        public IActionResult GetTicketById(int id)
        {
            var ticket = _ticketInterface.GetTicketById(id);

            if (ticket == null)
                return NotFound();

            return Ok(ticket);
        }

        /// <summary>
        /// Create Tickets
        /// </summary>
        [HttpPost]
        [ProducesResponseType(201, Type = typeof(ICollection<Ticket>))]
        public ActionResult<Ticket> AddTickets([FromBody] ICollection<Ticket> tickets)
        {
            ICollection<Ticket> createdTickets = _ticketInterface.AddTickets(tickets);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(createdTickets);
        }

        /// <summary>
        /// Buy Tickets by Passengers data
        /// </summary>
        /// 
        [HttpPost("Buy")]
        [ProducesResponseType(200, Type = typeof(ICollection<BuyTicketResponse>))]
        public ActionResult<ICollection<BuyTicketResponse>> BuyTickets([FromBody] List<BuyTicketResponse> purchasedTicketsData)
        {
            ICollection<BuyTicketResponse> buyTicketResponse = _ticketInterface.BuyTickets(purchasedTicketsData);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(buyTicketResponse);
        }

        /// <summary>
        /// Get tickets by phone number
        /// </summary>
        [HttpPost("GetTicketsByPhone")]
        [ProducesResponseType(201, Type = typeof(ICollection<TicketResponse>))]
        public ActionResult<TicketResponse> GetTicketsByPhone([FromBody] string phone)
        {
            ICollection<TicketResponse> ticketResponse = _ticketInterface.GetTicketsByPhone(phone);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(ticketResponse);
        }
    }

}
