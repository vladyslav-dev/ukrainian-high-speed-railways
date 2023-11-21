using Microsoft.EntityFrameworkCore;
using UHR.Data;
using UHR.Interfaces;
using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Repositories
{
    public class TripRepository : ITripInterface
    {
        private readonly DataContext _context;

        public TripRepository(DataContext context)
        {
            _context = context; 
        }

        public ICollection<Trip> GetTrips()
        {
            return _context.Trips
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Origin_city)
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Destination_city)
                .OrderBy(t => t.Id).ToList();
        }

        public ICollection<Trip> AddTrips(ICollection<Trip> trips)
        {
            foreach (var trip in trips)
            {
                var existingRailway = _context.Railways.Find(trip.Railway.Id);
                var existingOriginCity = _context.Cities.Find(trip.Railway.Origin_city.Id);
                var existingDestinationCity = _context.Cities.Find(trip.Railway.Destination_city.Id);

                if (existingRailway != null)
                {
                    trip.Railway = existingRailway;
                }

                if (existingOriginCity != null)
                {
                    trip.Railway.Origin_city = existingOriginCity;
                }

                if (existingDestinationCity != null)
                {
                    trip.Railway.Destination_city = existingDestinationCity;
                }

                _context.Trips.Add(trip);
            }

            _context.SaveChanges();
            return trips;
        }

        public Trip GetTripById(int id)
        {
            return _context.Trips
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Origin_city)
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Destination_city)
                .FirstOrDefault(t => t.Id == id);
        }

        public ICollection<Trip> GetTripsByQueries(string fromCity, string toCity, string fromDate, string? toDate)
        {
            var trips = _context.Trips
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Origin_city)
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Destination_city)
                .Where(t => t.Railway.Origin_city.Name == fromCity && t.Railway.Destination_city.Name == toCity);

            if (!string.IsNullOrEmpty(toDate))
            {

                trips = trips.Where(t => t.Departure_date >= DateTime.Parse(fromDate).ToUniversalTime() && t.Arrival_date <= DateTime.Parse(toDate).ToUniversalTime());
            }
            else
            {
                trips = trips.Where(t => t.Departure_date >= DateTime.Parse(fromDate).ToUniversalTime());
            }
            return trips.OrderBy(t => t.Id).ToList();
        }

        public List<SearchResponse> GetTripsInfosByTripsIds(int[] tripsIds)
        {
            var seats = _context.Seats
                            .Where(seat => tripsIds.Contains(seat.Id))
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
                            .ToList();

            List<SearchResponse> response = new List<SearchResponse>();

            foreach (var trip in tripsIds)
            {
                int standartSeats = 0;
                int vipSeats = 0;
                float standartPrice = 0;
                float vipPrice = 0;

                foreach (var seat in seats)
                {
                    if (seat.Trip.Id == trip)
                    {
                        if (seat.Wagon.Type.Type == "Standart")
                        {
                            if (!seat.Reserved) standartSeats++;

                            if (standartPrice == 0) standartPrice = seat.Wagon.Seat_Price;
                        }

                        if (seat.Wagon.Type.Type == "VIP")
                        {
                            if (!seat.Reserved) vipSeats++;

                            if (vipPrice == 0) vipPrice = seat.Wagon.Seat_Price;
                        }
                    }
                }

                var StandartInfo = new TripInfo
                {
                    Seats = standartSeats,
                    Price = standartPrice
                };

                var VipInfo = new TripInfo
                {
                    Seats = vipSeats,
                    Price = vipPrice
                };

                var searchResponse = new SearchResponse
                {
                    TripId = trip,
                    Standart = StandartInfo,
                    Vip = VipInfo
                };

                response.Add(searchResponse);
            }

            return response;
        }
    }
}
