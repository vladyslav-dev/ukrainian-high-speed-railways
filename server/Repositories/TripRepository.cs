﻿using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System.Runtime.InteropServices;
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

        public ICollection<FindTripsResponse> GetTripsByQueries(string fromCity, string toCity, string fromDate, string? toDate)
        {
            var trips = _context.Trips
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Origin_city)
                .Include(t => t.Railway)
                    .ThenInclude(r => r.Destination_city);

            IEnumerable<Trip> resultTrips = new List<Trip>();
            var fromTrips = trips.Where(t => t.Railway.Origin_city.Name == fromCity && t.Railway.Destination_city.Name == toCity);

            if (!string.IsNullOrEmpty(toDate))
            {
                var toTrips = trips.Where(t => t.Railway.Origin_city.Name == toCity && t.Railway.Destination_city.Name == fromCity);
                fromTrips = fromTrips.Where(t => t.Departure_date.Date == DateTime.Parse(fromDate).ToUniversalTime().Date);
                toTrips = toTrips.Where(t => t.Departure_date.Date == DateTime.Parse(toDate).ToUniversalTime().Date);
                resultTrips = toTrips.Union(fromTrips);
            }
            else
            {
                fromTrips = fromTrips.Where(t => t.Departure_date.Date == DateTime.Parse(fromDate).ToUniversalTime().Date);
                resultTrips = fromTrips;
            }

            ICollection<FindTripsResponse> response = new List<FindTripsResponse>();

            foreach (var trip in resultTrips)
            {
                var returned = false;
                if (trip.Railway.Origin_city.Name != fromCity) returned = true;

                var findTripsResponse = new FindTripsResponse()
                {
                    Returned = returned,
                    Trip = trip
                };

                response.Add(findTripsResponse);
            }
            return response.OrderBy(r => r.Trip.Id).ToList();
        }

        public ICollection<SearchResponse> GetTripsInfosByTripsIds(int[] tripsIds)
        {
            var seats = _context.Seats
                            .Where(seat => tripsIds.Contains(seat.Trip.Id))
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

            ICollection<SearchResponse> response = new List<SearchResponse>();

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

        public ExactTripResponse GetWagonsAndSeatsByTripID(int id)
        {
            var seats = _context.Seats
                            .Where(seat => seat.Trip.Id == id)
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

            ICollection<int> wagons = new List<int>();

            foreach (var seat in seats)
            {
                if (!wagons.Contains(seat.Wagon.Id)) wagons.Add(seat.Wagon.Id);
            }

            ICollection<WagonsResponse> wagonsResponse = new List<WagonsResponse>();

            foreach (var wagon in wagons)
            {
                int wagonId = 0;
                WagonType wagonType = null;
                float wagonPrice = 0;
                int wagonNumber = 0;
                ICollection<WagonSeatResponse> wagonSeats = new List<WagonSeatResponse>();

                foreach (var seat in seats)
                {
                    if (wagon == seat.Wagon.Id)
                    {
                        if (wagonId == 0) wagonId = seat.Wagon.Id;

                        if (wagonType == null) wagonType = seat.Wagon.Type;

                        if (wagonPrice == 0) wagonPrice = seat.Wagon.Seat_Price;

                        if (wagonNumber == 0) wagonNumber = seat.Wagon.Number;

                        var wagonSeatResponse = new WagonSeatResponse
                        {
                            Id = seat.Id,
                            Number = seat.Number,
                            Reserved = seat.Reserved
                        };

                        wagonSeats.Add(wagonSeatResponse);
                    }
                }

                var wagonsResponseList = new WagonsResponse
                {
                    WagonId = wagonId,
                    WagonType = wagonType,
                    WagonNumber = wagonNumber,
                    WagonPrice = wagonPrice,
                    WagonSeats = wagonSeats
                };

                wagonsResponse.Add(wagonsResponseList);
            }

            var response = new ExactTripResponse
            {
                TripId = id,
                TripWagons = wagonsResponse
            };

            return response;
        }
    }
}
