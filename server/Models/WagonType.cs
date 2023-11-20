using System.ComponentModel.DataAnnotations;

namespace UHR.Models
{
    public enum WagonTypeEnum
    {
        VIP,
        Standart
    }

    public class WagonType
    {
        public int Id { get; set; }


        [EnumDataType(typeof(WagonTypeEnum))]
        public string Type { get; set; }
    }
}
