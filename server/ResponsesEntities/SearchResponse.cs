﻿namespace UHR.ResponsesEntities
{
    public interface ITripResponse
    {
        public int TripId { get; set; }
        public TripInfo Standart { get; set; }
        public TripInfo Vip { get; set; }
    }

    public class TripInfo
    {
        public int Seats { get; set; }
        public float Price { get; set; }
    }

    public class SearchResponse : ITripResponse
    {
        public int TripId { get; set; }
        public TripInfo Standart { get; set; }
        public TripInfo Vip { get; set; }
    }
}
