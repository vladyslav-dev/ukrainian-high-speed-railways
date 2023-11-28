import { TBuyTicketsPayload, TTicketsByPhoneResponse } from "@/types/ticket"

export async function buyTicketsRequest(payload: TBuyTicketsPayload): Promise<TBuyTicketsPayload> {
    const res = await fetch(`https://uhr-server.azurewebsites.net/api/Ticket/Buy`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTicketsByPhone(phone: string): Promise<TTicketsByPhoneResponse> {
    const res = await fetch(`https://uhr-server.azurewebsites.net/api/Ticket/GetTicketsByPhone`, {
        method: "POST",
        body: JSON.stringify(phone),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}