namespace UHR.Models
{
    public class Passenger
    {
        public int id { get; set; }

        public Ticket ticket { get; set; }

        public string firstName { get; set; }

        public string? middleName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string phone { get; set; }
    }
}
