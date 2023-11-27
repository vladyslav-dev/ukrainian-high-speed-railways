import { IRailway } from '@/types/railway';


/* Trip */
export interface ITrip {
    id: number;
    name: string;
    railway: IRailway;
    departure_date: Date;
    arrival_date: Date;
}

export type TTripsIds = number[]

export type TTripCategory = {
    seats: number;
    price: number;
}

/* Trip Info */

export interface ITripInfo {
    tripId: number;
    standard: TTripCategory;
    vip: TTripCategory;
}

export type TTripInfoResponse = ITripInfo[]

/* Search Trips Query Params */

export type TSearchTripsQueryParams = {
    originCityQuery: string,
    destinationCityQuery: string,
    fromDateQuery: string,
    toDateQuery: string
}

/* Find Trip */

export interface IFindTrip {
    returned: boolean;
    trip: ITrip
}

export type TFindTripsResponse = IFindTrip[]

/* Search Result */

export interface ISearchResultTrip extends ITrip {
    standart: TTripCategory;
    vip: TTripCategory;
}

export interface ISearchResultData {
    trip: ISearchResultTrip
    backTrip: ISearchResultTrip | null
}