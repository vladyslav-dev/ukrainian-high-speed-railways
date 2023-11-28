import { TBuyTicketsPayload } from "@/types/ticket"

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