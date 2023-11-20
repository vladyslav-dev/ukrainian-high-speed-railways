namespace UHR.Models
{
    public class Trip
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Railway Railway { get; set; }

        public DateTime Departure_date { get; set; }

        public DateTime Arrival_date { get; set; }
    }
}