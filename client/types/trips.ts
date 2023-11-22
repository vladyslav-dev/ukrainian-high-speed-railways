import { IRailway } from '@/types/railway';

export type TSearchTripsQueryParams = {
    originCityQuery: string,
    destinationCityQuery: string,
    fromDateQuery: string,
    toDateQuery: string
}
  
export interface ITrip {
    id: number;
    name: string;
    railway: IRailway;
    departure_date: Date;
    arrival_date: Date;
}

export type TTripResponse = ITrip[]

export type TTripsIds = number[]

export type TTripCategory = {
    seats: number;
    price: number;
}

export interface ITripInfo {
    tripId: number;
    standard: TTripCategory;
    vip: TTripCategory;
}

export type TTripInfoResponse = ITripInfo[]

export interface ISearchResultData extends ITrip {
    standart: TTripCategory;
    vip: TTripCategory;
}