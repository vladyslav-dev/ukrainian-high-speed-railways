namespace UHR.Models
{
    puclic class Destination
    {
        public int id { get; set; }
        public string origin_city { get; set; }
        public float origin_latitude { get; set; }
        public float origin_longitude { get; set;
        public string destination_city { get; set; }
        public float destination_latitude { get; set; }
        public float destination_longitude { get; set; }
        public float current_latitude { get; set; }
        public float current_longitude { get; set; }
    }
}