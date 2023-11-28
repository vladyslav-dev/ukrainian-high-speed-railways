using UHR.Models;

namespace UHR.ResponsesEntities
{
    public class TicketResponse
    {
        public int TripId { get; set; }

        public string TripName { get; set; }

        public DateTime DepartureDate { get; set; }

        public DateTime ArrivalDate { get; set; }

        public float WagonPrice { get; set; }

        public string WagonType { get; set; }

        public int WagonNumber { get; set; }

        public int SeatId { get; set; }

        public int SeatNumber { get; set; }

        public string PassengerName { get; set; }

        public string? PassengerMiddleName { get; set; }

        public string PassengerLastName { get; set; }

        public string PassengerEmail { get; set; }

        public string PassengerPhone { get; set; }

        public string CityTo { get; set; }

        public string CityFrom { get; set; }
    }
}
