using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class PassengerRepository : IPassengerInterface
    {
        private readonly DataContext _context;

        public PassengerRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Passenger> GetPassengers()
        {
            return _context.Passengers
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Type)
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
                .OrderBy(p => p.Id).ToList();
        }

        public ICollection<Passenger> AddPassengers(ICollection<Passenger> passengers)
        {
            foreach (var passenger in passengers)
            {
                var existingTicket = _context.Tickets.Find(passenger.Ticket.Id);
                var existingSeat = _context.Seats.Find(passenger.Ticket.Seat.Id);
                var existingWagon = _context.Wagons.Find(passenger.Ticket.Seat.Wagon.Id);
                var existingTrip = _context.Trips.Find(passenger.Ticket.Seat.Trip.Id);
                var existingRailway = _context.Railways.Find(passenger.Ticket.Seat.Trip.Railway.Id);
                var existingOriginCity = _context.Cities.Find(passenger.Ticket.Seat.Trip.Railway.Origin_city.Id);
                var existingDestinationCity = _context.Cities.Find(passenger.Ticket.Seat.Trip.Railway.Destination_city.Id);
                var existingWagonType = _context.WagonTypes.Find(passenger.Ticket.Seat.Wagon.Type.Id);

                if (existingTicket != null) 
                { 
                    passenger.Ticket = existingTicket;
                }

                if (existingSeat != null)
                {
                    passenger.Ticket.Seat = existingSeat;
                }

                if (existingWagon != null)
                {
                    passenger.Ticket.Seat.Wagon = existingWagon;
                }

                if (existingTrip != null)
                {
                    passenger.Ticket.Seat.Trip = existingTrip;
                }

                if (existingRailway != null)
                {
                    passenger.Ticket.Seat.Trip.Railway = existingRailway;
                }

                if (existingOriginCity != null)
                {
                    passenger.Ticket.Seat.Trip.Railway.Origin_city = existingOriginCity;
                }

                if (existingDestinationCity != null)
                {
                    passenger.Ticket.Seat.Trip.Railway.Destination_city = existingDestinationCity;
                }

                if (existingWagonType != null)
                {
                    passenger.Ticket.Seat.Wagon.Type = existingWagonType;
                }

                _context.Passengers.Add(passenger);
            }

            _context.SaveChanges();
            return passengers;
        }

        public Passenger GetPassengerById(int id)
        {
            return _context.Passengers
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Train)
                                .ThenInclude(t => t.Type)
                .Include(p => p.Ticket)
                    .ThenInclude(t => t.Seat)
                        .ThenInclude(s => s.Wagon)
                            .ThenInclude(w => w.Type)
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
                .FirstOrDefault(p => p.Id == id);
        }
    }
}
