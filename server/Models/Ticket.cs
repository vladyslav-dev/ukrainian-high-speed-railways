namespace UHR.Models
{
    public class Ticket
    {
        public int Id { get; set; }

        public Seat Seat { get; set; }

        public decimal Price { get; set; }
    }
}
