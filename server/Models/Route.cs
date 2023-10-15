namespace UHR.Models
{
	public class Route
	{
		public string id { get; set; }

		public string name { get; set; }

		public Destination destination { get; set; }

        public DateTime departure_date { get; set; }

        public DateTime arrival_date { get; set; }
    }
}