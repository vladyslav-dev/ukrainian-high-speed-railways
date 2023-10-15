namespace UHR.Models
{
    public enum TrainTypeEnum
    {
        Passenger,
        Freight
    }

    public class TrainType
    {
        public int id { get; set; }

        public TrainTypeEnum Type { get; set; }
    }
}
