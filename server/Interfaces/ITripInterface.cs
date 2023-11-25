using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Interfaces
{
    public interface ITripInterface
    {
        ICollection<Trip> GetTrips();

        ICollection<Trip> AddTrips(ICollection<Trip> trips);

        Trip GetTripById(int id);

        ICollection<FindTripsResponse> GetTripsByQueries(string fromCity, string toCity, string fromDate, string? toDate);

        ICollection<SearchResponse> GetTripsInfosByTripsIds(int[] tripsIds);

        ExactTripResponse GetWagonsAndSeatsByTripID(int id);
    }
}
