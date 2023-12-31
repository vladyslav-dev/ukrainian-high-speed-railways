export type TWagonType = 'Standart' | 'VIP'

export interface IWagonType {
    id: number;
    type: TWagonType;
}

export interface IWagonSeatsResponse {
    id: number;
    number: number;
    reserved: boolean;
}

export interface IWagonsResponse {
    wagonId: number;
    wagonNumber: number;
    wagonType: IWagonType;
    wagonPrice: number;
    wagonSeats: IWagonSeatsResponse[];
}

export interface IWagonsAndSeatsResponse {
    tripId: number;
    tripWagons: IWagonsResponse[];
}