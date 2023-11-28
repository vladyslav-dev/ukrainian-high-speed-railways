"use client"

import { getTicketsByPhone } from "@/api/tickets"
import NotFound from "@/components/NotFound"
import { TTicketsByPhoneResponse } from "@/types/ticket"
import { useEffect, useState } from "react"

const TicketsPage = () => {
    const [tickets, setTickets] = useState<TTicketsByPhoneResponse>([])

    const getPhones = () => {
        return JSON.parse(localStorage.getItem('UHR/PHONES') || '[]')
    }

    const pullTickets = async () => {
        Promise.all(getPhones().map((phone: string) => getTicketsByPhone(phone))).then(res => setTickets(res.flat()))
    }

    useEffect(() => {
        pullTickets()
    }, [])

    console.log('tickets', tickets)

    return (
        <div className="h-full w-full bg-white p-4 rounded-tl-[6px] rounded-tr-[6px] overflow-hidden">
            <h1 className="text-2xl p-4 mb-4">Tickets</h1>
            {tickets.length === 0 ? (
                <NotFound
                    title="No tickets found"
                    description="You have not bought any tickets yet."
                />
            ) : (
                <div className="h-full overflow-auto py-8">
                    <div className="mx-auto">
                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {tickets.map((ticket, index) => (
                                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md last:mb-16">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold mb-2">{ticket.tripName}</h2>
                                        <p className="text-sm mb-2">
                                        From: {ticket.cityFrom} - To: {ticket.cityTo}
                                        </p>
                                        <p className="text-sm mb-2">Departure: {new Date(ticket.departureDate).toLocaleString()}</p>
                                        <p className="text-sm mb-2">Arrival: {new Date(ticket.arrivalDate).toLocaleString()}</p>
                                        <p className="text-sm mb-2">Seat Number: {ticket.seatNumber}</p>
                                        <p className="text-sm mb-2">
                                        Passenger: {ticket.passengerName} {ticket.passengerMiddleName} {ticket.passengerLastName}
                                        </p>
                                        <p className="text-sm mb-2">Email: {ticket.passengerEmail}</p>
                                        <p className="text-sm mb-2">Phone: {ticket.passengerPhone}</p>
                                        <p className="text-sm mb-2">Price: ${ticket.wagonPrice}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TicketsPage