using UHR.Models;
using UHR.ResponsesEntities;

namespace UHR.Interfaces
{
    public interface ITripInterface
    {
        ICollection<Trip> GetTrips();

        ICollection<Trip> AddTrips(ICollection<Trip> trips);

        Trip GetTripById(int id);

        ICollection<Trip> GetTripsByQueries(string fromCity, string toCity, string fromDate, string? toDate);

        List<SearchResponse> GetTripsInfosByTripsIds(int[] tripsIds);
    }
}
