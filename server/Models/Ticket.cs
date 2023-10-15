namespace UHR.Models
{
    public class Ticket
    {
        public int id { get; set; }

        public Seat seat { get; set; }

        public decimal price { get; set; }
    }
}
