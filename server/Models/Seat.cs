namespace UHR.Models
{
    public class Seat
    {
        public int Id { get; set; }

        public Wagon Wagon { get; set; }

        public Trip Trip { get; set; }

        public int Number { get; set; }

        public bool Reserved { get; set; }
    }
}
