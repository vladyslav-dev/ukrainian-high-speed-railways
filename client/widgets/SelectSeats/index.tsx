"use client"

import React, { use, useMemo, useState } from "react"
import { IWagonsAndSeatsResponse, IWagonsResponse } from "@/types/wagon"
import { ISearchResultTrip } from "@/types/trip"
import RemoveTicketIcon from "@/components/Icons/RemoveTicket"
import { useWorkflowStore } from "@/stores/useWorkflowStore"

interface ISelectSeatsProps {
    wagons: IWagonsAndSeatsResponse
    trip: ISearchResultTrip
    title: string
}

interface TTicketData {
    [key: string]: ISelectedSeat[]
}

type SeatType = "selected" | "busy" | "free"

interface ISeatProps extends React.HTMLAttributes<HTMLDivElement> {
   seatType?: SeatType
}

export interface ISelectedSeat {
    tripId: number,
    tripDepartureDate: Date;
    tripArrivalDate: Date;
    tripName: string
    wagonId: number
    wagonNumber: number
    wagonType: string
    wagonPrice: number
    seatId: number
    seatNumber: number
    seatReserved: boolean
}

const Seat: React.FC<ISeatProps> = (props) => {
    const { children, seatType, id, onClick } = props

    const seatTypeClassName = useMemo(() => {
        switch (seatType) {
            case "selected":
                return "bg-primary text-white cursor-pointer"
            case "busy":
                return "border border-secondary text-secondary cursor-not-allowed"
            case "free":
                return "bg-primaryOpacity border border-primary cursor-pointer"
            default:
                return ""
        }
    }, [seatType])

    return (
        <div
            id={id}
            onClick={seatType !== "busy" ? onClick : () => {}}
            className={`w-[28px] h-[28px] flex justify-center items-center rounded-md text-primary ${seatTypeClassName}`}
        >
            {children}
        </div>
    )
}

const SeatsLegend = () => {
    return (
        <div className="flex items-center gap-7 py-3">
            <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] rounded-full bg-primary" />
                <div className="text-sm">Selected</div>
            </div>
            <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] rounded-full border border-stroke" />
                <div className="text-sm">Busy</div>
            </div>
            <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] rounded-full border border-primary bg-primaryOpacity" />
                <div className="text-sm">Free</div>
            </div>
        </div>
    )
}

interface ITicketsProps {
    selectedSeats: ISelectedSeat[]
    onTicketRemove: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Tickets = (props: ITicketsProps) => {
    const { selectedSeats, onTicketRemove } = props

    const getTickets = () => {
        const tickets: TTicketData = {};

        selectedSeats.forEach((trip: ISelectedSeat) => {
          const { tripName } = trip;

          if (!tickets[tripName]) {
            tickets[tripName] = [];
          }

          tickets[tripName].push(trip);
        });

        return tickets;
    }

    const tickets = useMemo(() => getTickets(), [selectedSeats])

    return Object.keys(tickets).map((tripName) => {
        return (
            <React.Fragment key={tripName}>
                <div className="text-xs my-4">{tripName}</div>
                <div className="flex justify-start flex-wrap gap-4">
                    {tickets[tripName].map((selectedSeat) => (
                        <div key={selectedSeat.seatId} className="flex flex-col items-center justify-between w-[112px] h-[100px] relative rounded-[6px] mt-6 bg-backgroundLightGrey">
                            <div className="flex flex-col justify-center items-center h-full gap-2">
                                <div className="text-sm">Wagon {selectedSeat.wagonNumber}</div>
                                <div className="text-sm">Seat {selectedSeat.seatNumber}</div>
                            </div>
                            <div className="flex items-center justify-center py-[6px] w-full text-sm text-white bg-primary rounded-b-[6px]">{selectedSeat.wagonPrice} USD</div>
                            <div className="absolute top-[-8px] right-[-8px] cursor-pointer" id={String(selectedSeat.seatId)} onClick={onTicketRemove}>
                                <RemoveTicketIcon />
                            </div>
                            <div className="absolute top-[-22px] left-1 text-secondary text-xs">{selectedSeat.wagonType}</div>
                        </div>
                    ))}
                </div>
            </React.Fragment>
        )
    })
}

const SelectSeats = (props: ISelectSeatsProps) => {
    const { wagons, trip, title } = props

    const { selectedSeats, setSelectedSeats } = useWorkflowStore()

    const { departureDate, arrivalDate } = useMemo(() => {
        const departureDate = new Date(trip.departure_date).toLocaleString()
        const arrivalDate = new Date(trip.arrival_date).toLocaleString()

        return {
            departureDate,
            arrivalDate
        }
    }, [trip.departure_date, trip.arrival_date])

    const handleSeatClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { id } = event.currentTarget

        const found = selectedSeats.find((selectedSeat) => String(selectedSeat.seatId) === id)

        if (found) {
            setSelectedSeats(selectedSeats.filter((selectedSeat) => String(selectedSeat.seatId) !== id))
        } else {
            const wagon = wagons.tripWagons.find((wagon) => wagon.wagonSeats.find((seat) => String(seat.id) === id))

            if (wagon) {
                const seat = wagon.wagonSeats.find((seat) => String(seat.id) === id)
                console.log('trip', trip)
                if (seat) {
                    setSelectedSeats([...selectedSeats, {
                        tripId: trip.id,
                        tripName: trip.name,
                        tripDepartureDate: trip.departure_date,
                        tripArrivalDate: trip.arrival_date,
                        wagonId: wagon.wagonId,
                        wagonNumber: wagon.wagonNumber,
                        wagonType: wagon.wagonType.type,
                        wagonPrice: wagon.wagonPrice,
                        seatId: seat.id,
                        seatNumber: seat.number,
                        seatReserved: seat.reserved
                    }])
                }
            }
        }
    }

    const handleRemoveTicketClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { id } = event.currentTarget

        setSelectedSeats(selectedSeats.filter((selectedSeat) => String(selectedSeat.seatId) !== id))
    }

    return (
        <div className="p-4 pb-0 h-full flex flex-col overflow-hidden">
            <h2 className="text-xl font-medium mb-3">{title}</h2>

            <div className="flex flex-1 gap-6 pt-0 h-full overflow-auto relative">
                <div className="flex flex-col max-w-[512px] h-full">
                    <div className="sticky top-0 bg-white">
                        <div className="flex flex-col gap-1">
                            <div className="text-sm">{trip.name}</div>
                            <div className="text-xs">{departureDate} - {arrivalDate}</div>
                        </div>
                        <SeatsLegend />
                    </div>
                    <div className="flex flex-1 flex-col pb-4">
                        {wagons.tripWagons.map((wagon: IWagonsResponse) => (
                            <div key={wagon.wagonId} className="mt-3">
                                <h3 className="mb-2 ml-2">Wagon {wagon.wagonNumber} ({wagon.wagonType.type})</h3>
                                <div className="border-2 border-primary rounded-lg w-full h-[180px] flex flex-col justify-between p-2 max-w-[490px]">
                                    <div className="flex flex-col justify-between h-full text-sm">
                                        <div className="flex flex-wrap gap-[6px]">
                                            {wagon.wagonSeats.map((seat, index) => {
                                                const seatType = seat.reserved ? "busy" : selectedSeats.find((selectedSeat) => String(selectedSeat.seatId) === String(seat.id)) ? "selected" : "free"

                                                return wagon.wagonSeats.length / 2 > index ? (
                                                    <Seat key={seat.id} id={String(seat.id)} onClick={handleSeatClick} seatType={seatType}>{seat.number}</Seat>
                                                ) : null}
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-[6px]">
                                            {wagon.wagonSeats.map((seat, index) => {
                                                const seatType = seat.reserved ? "busy" : selectedSeats.find((selectedSeat) => String(selectedSeat.seatId) === String(seat.id)) ? "selected" : "free"

                                                return wagon.wagonSeats.length / 2 <= index ? (
                                                    <Seat key={seat.id} id={String(seat.id)} onClick={handleSeatClick} seatType={seatType}>{seat.number}</Seat>
                                                ) : null}
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    {selectedSeats.length > 0 && <div>Selected seat(s)</div>}
                    <Tickets selectedSeats={selectedSeats} onTicketRemove={handleRemoveTicketClick} />
                </div>
            </div>
        </div>
    )
}

export default SelectSeats