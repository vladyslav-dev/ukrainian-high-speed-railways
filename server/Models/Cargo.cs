namespace UHR.Models
{
    public class Cargo
    {
        public int id { get; set; }

        public Wagon wagon { get; set; }

        public string name { get; set; }

        public decimal weight { get; set; }
    }
}
