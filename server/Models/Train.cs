namespace UHR.Models
{
    public class Train
    {
        public int id { get; set; } 

        public string name { get; set; }

        public Route route { get; set; }

        public TrainType type { get; set; }
    }
}
