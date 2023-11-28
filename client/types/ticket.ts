import { TWagonType } from "./wagon";

export interface IBuyTicket {
  seat_id: number,
  firstName: string,
  middleName: string | null,
  lastName: string,
  email: string,
  phone: string
}

export type TBuyTicketsPayload = IBuyTicket[]

export interface ITicketsByPhone {
  tripId: number;
  tripName: string;
  departureDate: string;
  arrivalDate: string;
  wagonPrice: number;
  wagonType: TWagonType;
  wagonNumber: number;
  seatId: number;
  seatNumber: number;
  passengerName: string;
  passengerMiddleName: string;
  passengerLastName: string;
  passengerEmail: string;
  passengerPhone: string;
  cityTo: string;
  cityFrom: string;
}

export type TTicketsByPhoneResponse = ITicketsByPhone[]
