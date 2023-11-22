import { ICity } from '@/types/city';

export interface IRailway {
    id: number;
    origin_city: ICity;
    destination_city: ICity;
}