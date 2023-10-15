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

        public WagonTypeEnum type { get; set; }
    }
}
