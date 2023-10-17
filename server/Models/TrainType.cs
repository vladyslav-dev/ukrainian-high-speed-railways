using System.ComponentModel.DataAnnotations;

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

        [EnumDataType(typeof(TrainTypeEnum))]
        public string type { get; set; }
    }
}
