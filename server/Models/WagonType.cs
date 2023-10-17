using System.ComponentModel.DataAnnotations;

namespace UHR.Models
{
    public enum WagonTypeEnum
    {
        VIP,
        Standard
    }

    public class WagonType
    {
        public int id { get; set; }


        [EnumDataType(typeof(WagonTypeEnum))]
        public string type { get; set; }
    }
}
