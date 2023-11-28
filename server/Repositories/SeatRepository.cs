using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;

namespace UHR.Repositories
{
    public class SeatRepository : ISeatInterface
    {
        private readonly DataContext _context;

        public SeatRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<Seat> GetSeats()
        {
            return _context.Seats
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
                 .OrderBy(s => s.Id).ToList();
        }

        public ICollection<Seat> AddSeats(ICollection<Seat> seats)
        {
            foreach (var seat in seats)
            {
                var existingWagon = _context.Wagons.Find(seat.Wagon.Id);
                var existingTrain = _context.Trains.Find(seat.Wagon.Train.Id);
                var existingTrip = _context.Trips.Find(seat.Trip.Id);
                var existingTrainType = _context.TrainTypes.Find(seat.Wagon.Train.Type.Id);
                var existingWagonType = _context.WagonTypes.Find(seat.Wagon.Type.Id);
                var existingRailway = _context.Railways.Find(seat.Trip.Railway.Id);
                var existingOriginCity = _context.Cities.Find(seat.Trip.Railway.Origin_city.Id);
                var existingDestinationCity = _context.Cities.Find(seat.Trip.Railway.Destination_city.Id);

                if (existingWagon != null)
                {
                    seat.Wagon = existingWagon;
                }

                if (existingTrain != null)
                {
                    seat.Wagon.Train = existingTrain;
                }

                if (existingTrip != null)
                {
                    seat.Trip = existingTrip;
                }

                if (existingRailway != null)
                {
                    seat.Trip.Railway = existingRailway;
                }

                if (existingOriginCity != null)
                {
                    seat.Trip.Railway.Origin_city = existingOriginCity;
                }

                if (existingDestinationCity != null)
                {
                    seat.Trip.Railway.Destination_city = existingDestinationCity;
                }

                if (existingTrainType != null)
                {
                    seat.Wagon.Train.Type = existingTrainType;
                }

                if (existingWagonType != null)
                {
                    seat.Wagon.Type = existingWagonType;
                }

                _context.Seats.Add(seat);
            }

            _context.SaveChanges();
            return seats;
        }

        public Seat GetSeatById(int id)
        {
            return _context.Seats
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
                 .FirstOrDefault(s => s.Id == id);
        }
    }
}
