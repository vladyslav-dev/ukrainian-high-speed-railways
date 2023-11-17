using System.ComponentModel.DataAnnotations.Schema;

namespace UHR.Models
{
    public class Route
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public Destination Destination { get; set; }

        public DateTime Departure_date { get; set; }

        public DateTime Arrival_date { get; set; }
    }
}