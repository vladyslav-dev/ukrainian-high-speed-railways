namespace UHR.Models
{
    public class Cargo
    {
        public int Id { get; set; }

        public ICollection<Wagon> Wagons { get; set; }

        public string Name { get; set; }

        public decimal Weight { get; set; }
    }
}
