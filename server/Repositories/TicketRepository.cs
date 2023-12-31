﻿using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Repositories
{
    public class TicketRepository : ITicketInterface
    {
        private readonly DataContext _context;

        public TicketRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Ticket> GetTickets()
        {
            return _context.Tickets
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Train)
                            .ThenInclude(t => t.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Origin_city)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Destination_city)
                .OrderBy(t => t.Id).ToList();
        }

        public ICollection<Ticket> AddTickets(ICollection<Ticket> tickets)
        {
            foreach (var ticket in tickets)
            {
                var existingSeat = _context.Seats.Find(ticket.Seat.Id);
                var existingWagon = _context.Wagons.Find(ticket.Seat.Wagon.Id);
                var existingTrain = _context.Trains.Find(ticket.Seat.Wagon.Train.Id);
                var existingTrainType = _context.TrainTypes.Find(ticket.Seat.Wagon.Train.Type.Id);
                var existingTrip = _context.Trips.Find(ticket.Seat.Trip.Id);
                var existingWagonType = _context.WagonTypes.Find(ticket.Seat.Wagon.Type.Id);
                var existingRailway = _context.Railways.Find(ticket.Seat.Trip.Railway.Id);
                var existingOriginCity = _context.Cities.Find(ticket.Seat.Trip.Railway.Origin_city.Id);
                var existingDestinationCity = _context.Cities.Find(ticket.Seat.Trip.Railway.Destination_city.Id);

                if (existingSeat != null)
                {
                    ticket.Seat = existingSeat;
                }

                if (existingWagon != null)
                {
                    ticket.Seat.Wagon = existingWagon;
                }

                if (existingTrain != null) 
                {
                    ticket.Seat.Wagon.Train = existingTrain;
                }

                if (existingTrainType != null)
                {
                    ticket.Seat.Wagon.Train.Type = existingTrainType;
                }

                if (existingTrip != null)
                {
                    ticket.Seat.Trip = existingTrip;
                }

                if (existingWagonType != null)
                {
                    ticket.Seat.Wagon.Type = existingWagonType;
                }

                if (existingRailway != null)
                {
                    ticket.Seat.Trip.Railway = existingRailway;
                }

                if (existingOriginCity != null)
                {
                    ticket.Seat.Trip.Railway.Origin_city = existingOriginCity;
                }

                if (existingDestinationCity != null)
                {
                    ticket.Seat.Trip.Railway.Destination_city = existingDestinationCity;
                }

                _context.Tickets.Add(ticket);
            }

            _context.SaveChanges();
            return tickets;
        }

        public Ticket GetTicketById(int id)
        {
            return _context.Tickets
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Train)
                            .ThenInclude(t => t.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Wagon)
                        .ThenInclude(w => w.Type)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Origin_city)
                .Include(t => t.Seat)
                    .ThenInclude(s => s.Trip)
                        .ThenInclude(t => t.Railway)
                            .ThenInclude(r => r.Destination_city)
                .FirstOrDefault(t => t.Id == id);
        }

        public ICollection<BuyTicketResponse> BuyTickets(List<BuyTicketResponse> purchasedTicketsData)
        {
            List<int> seatsIds = new List<int>();

            foreach (var seat in purchasedTicketsData)
            {
                seatsIds.Add(seat.Seat_id);
            }

            var purchasedSeats = _context.Seats
                                    .Include(s => s.Wagon)
                                        .ThenInclude(w => w.Train)
                                            .ThenInclude(t => t.Type)
                                    .Include(s => s.Wagon)
                                        .ThenInclude(w => w.Type)
                                    .Include(s => s.Trip)
                                        .ThenInclude(t => t.Railway)
                                            .ThenInclude(r => r.Origin_city)
                                    .Include(s => s.Trip)
                                        .ThenInclude(t => t.Railway)
                                            .ThenInclude(r => r.Destination_city)
                                    .Where(s => seatsIds.Contains(s.Id))
                                    .ToList();

            for (int i = 0; i < purchasedSeats.Count; i++)
            {
                purchasedSeats[i].Reserved = true;
                _context.Seats.Update(purchasedSeats[i]);

                Ticket ticket = new Ticket()
                {
                    Seat = purchasedSeats[i]
                };

                _context.Tickets.Add(ticket);

                Passenger passenger = new Passenger()
                {
                    Ticket = ticket,
                    FirstName = purchasedTicketsData[i].FirstName,
                    MiddleName = purchasedTicketsData[i].MiddleName,
                    LastName = purchasedTicketsData[i].LastName,
                    Phone = purchasedTicketsData[i].Phone,
                    Email = purchasedTicketsData[i].Email
                };

                _context.Passengers.Add(passenger);
            }

            _context.SaveChanges();
            return purchasedTicketsData;
        }

        public ICollection<TicketResponse> GetTicketsByPhone(string phone)
        {
            var passengers = _context.Passengers
                                .Include(p => p.Ticket)
                                    .ThenInclude(t => t.Seat)
                                        .ThenInclude(s => s.Trip)
                                            .ThenInclude(t => t.Railway)
                                                .ThenInclude(r => r.Origin_city)
                                .Include(p => p.Ticket)
                                    .ThenInclude(t => t.Seat)
                                        .ThenInclude(s => s.Trip)
                                            .ThenInclude(t => t.Railway)
                                                .ThenInclude(r => r.Destination_city)
                                .Include(p => p.Ticket)
                                    .ThenInclude(t => t.Seat)
                                        .ThenInclude(s => s.Wagon)
                                            .ThenInclude(w => w.Train)
                                                .ThenInclude(t => t.Type)
                                .Include(p => p.Ticket)
                                    .ThenInclude(t => t.Seat)
                                        .ThenInclude(s => s.Wagon)
                                            .ThenInclude(w => w.Type)
                                .Where(p => p.Phone == phone)
                                .ToList();

            ICollection<TicketResponse> response = new List<TicketResponse>();

            foreach (var passenger in passengers)
            {
                var ticketResponse = new TicketResponse()
                {
                    TripId = passenger.Ticket.Seat.Trip.Id,
                    TripName = passenger.Ticket.Seat.Trip.Name,
                    DepartureDate = passenger.Ticket.Seat.Trip.Departure_date,
                    ArrivalDate = passenger.Ticket.Seat.Trip.Arrival_date,
                    WagonPrice = passenger.Ticket.Seat.Wagon.Seat_Price,
                    WagonType = passenger.Ticket.Seat.Wagon.Type.Type,
                    WagonNumber = passenger.Ticket.Seat.Wagon.Number,
                    SeatId = passenger.Ticket.Seat.Id,
                    SeatNumber = passenger.Ticket.Seat.Number,
                    PassengerName = passenger.FirstName,
                    PassengerLastName = passenger.LastName,
                    PassengerMiddleName = passenger.MiddleName,
                    PassengerEmail = passenger.Email,
                    PassengerPhone = passenger.Phone,
                    CityTo = passenger.Ticket.Seat.Trip.Railway.Destination_city.Name,
                    CityFrom = passenger.Ticket.Seat.Trip.Railway.Origin_city.Name
                };

                response.Add(ticketResponse);
            }

            return response;
        }
    }
}
