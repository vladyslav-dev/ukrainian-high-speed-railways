namespace UHR.Models
{
    public class Train
    {
        public int Id { get; set; } 

        public string Name { get; set; }

        public ICollection<Route> Routes { get; set; } 

        public TrainType Type { get; set; }
    }
}
