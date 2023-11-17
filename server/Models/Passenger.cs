namespace UHR.Models
{
    public class Passenger
    {
        public int Id { get; set; }

        public Ticket Ticket { get; set; }

        public string FirstName { get; set; }

        public string? MiddleName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}
