namespace UHR.Models
{
    public class Wagon
    {
        public int Id { get; set; } 

        public Train Train { get; set; }

        public int Number { get; set; }

        public WagonType Type { get; set; }

        public float Seat_Price { get; set; }
    }
}
