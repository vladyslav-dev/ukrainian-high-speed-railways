export type TTicketType = 'standart' | 'vip'

export interface IBuyTicket {
  seat_id: number,
  firstName: string,
  middleName: string | null,
  lastName: string,
  email: string,
  phone: string
}

export type TBuyTicketsPayload = IBuyTicket[]
