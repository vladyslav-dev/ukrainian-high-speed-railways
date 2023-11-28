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
        public int Id { get; set; }

        [EnumDataType(typeof(TrainTypeEnum))]
        public string Type { get; set; }
    }
}
