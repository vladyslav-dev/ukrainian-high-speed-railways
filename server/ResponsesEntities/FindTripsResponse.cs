using UHR.Models;

namespace UHR.ResponsesEntities
{
    public interface IFindTripsReponse
    {
        public bool Returned { get; set; }
        public Trip Trip { get; set; }
    }

    public class FindTripsResponse : IFindTripsReponse
    {
        public bool Returned { get; set; }
        public Trip Trip { get; set; }
    }
}
