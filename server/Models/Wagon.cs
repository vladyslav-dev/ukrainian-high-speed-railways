namespace UHR.Models
{
    public class Wagon
    {
        public int id { get; set; } 

        public Train train { get; set; }

        public int number { get; set; }

        public WagonType type { get; set; }
    }
}
