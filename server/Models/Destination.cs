namespace UHR.Models
{
    public class Destination
    {
        public int Id { get; set; }

        public City Origin_city { get; set; }

        public float Origin_latitude { get; set; }

        public float Origin_longitude { get; set; }

        public City Destination_city { get; set; }

        public float Destination_latitude { get; set; }

        public float Destination_longitude { get; set; }

        public float Current_latitude { get; set; }

        public float Current_longitude { get; set; }
    }
}