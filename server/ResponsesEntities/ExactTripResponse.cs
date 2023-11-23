using UHR.Models;

namespace UHR.ResponsesEntities
{
    public interface IExactTripResponse
    {
        public int TripId { get; set; }

        public ICollection<WagonsResponse> TripWagons { get; set; }
    }

    public class WagonSeatResponse
    {
        public int Id { get; set; }

        public int Number { get; set; }

        public bool Reserved { get; set; }
    }

    public class WagonsResponse
    {
        public int WagonId { get; set; }

        public WagonType WagonType { get; set; }

        public int WagonNumber { get; set; }

        public float WagonPrice { get; set; }

        public ICollection<WagonSeatResponse> WagonSeats { get; set; }
    }

    public class ExactTripResponse : IExactTripResponse
    {
        public int TripId { get; set; }
        
        public ICollection<WagonsResponse> TripWagons { get; set; }
    }
}
