export interface IWagonType {
    id: number;
    type: string;
}

export interface IWagonSeatsResponse {
    id: number;
    number: number;
    reserved: boolean;
}
  
export interface IWagonsResponse {
    wagonId: number;
    wagonType: IWagonType;
    wagonPrice: number;
    wagonSeats: IWagonSeatsResponse[];
}

export interface IWagonsAndSeatsResponse {
    tripId: number;
    tripWagons: IWagonsResponse[];
}