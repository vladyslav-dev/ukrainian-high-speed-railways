"use client"

import Button from "@/components/Button"
import ClockIcon from "@/components/Icons/Clock"
import TrainIcon from "@/components/Icons/Train"
import { TTicketType } from "@/types/ticket"
import { ISearchResultData } from "@/types/trip"
import { formatDate, formatDiffTime, getDiffTime } from "@/utils/date"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

interface ITicketProps {
    tripId: number
    type: TTicketType
    price: number
    availablePlaces: number
    onTicketClick: (tripId: number) => void
}

const Ticket = (props: ITicketProps) => {
    const { tripId, type, price, availablePlaces, onTicketClick } = props

    const handleClick = () => {
        onTicketClick(tripId)
    }

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-backgroundLightGrey rounded-[4px]">
            <div className="flex items-center mr-3">
                <span>{type}&nbsp;</span>
                <span className="text-secondary text-sm">{availablePlaces} place(s)</span>
            </div>
            <Button label={`${price} USD`} onClick={handleClick} size='medium' />
        </div>
    )
}

interface ICardProps extends ISearchResultData {}

const CardItem = (props: ICardProps) => {
    const { id, name, vip, standart, arrival_date, departure_date } = props

    const router = useRouter()

    const { departureTime, arrivalTime, formattedDepartureDate, formattedArrivalDate, diffTime } = useMemo(() => {
        const departureDate = new Date(departure_date)
        const arrivalDate = new Date(arrival_date)
    
        const departureTime = departureDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })
        const arrivalTime = arrivalDate.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })

        return {
            departureTime,
            arrivalTime,
            formattedDepartureDate: formatDate(departureDate),
            formattedArrivalDate: formatDate(arrivalDate),
            diffTime: formatDiffTime(getDiffTime(arrivalDate, departureDate))
        }
    }, [departure_date, arrival_date])

    const handleTicketClick = (tripId: number) => {
        router.push(`/workflow/seats?tripId=${tripId}`)
    }

    return (
        <div className="flex gap-6 justify-between bg-white rounded-[6px] p-4 whitespace-nowrap" style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}>
            <div className="flex flex-col justify-between gap-10 flex-1 min-w-[380px] max-w-[380px]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-lg font-medium">{departureTime}</div>
                        <div className="text-xs text-secondary">{formattedDepartureDate}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[42px] h-[1px] bg-primary" />
                        <div className="flex items-center mx-2">
                            <ClockIcon />
                            <span className="text-primary ml-2">{diffTime}</span>
                        </div>
                        <div className="w-[42px] h-[1px] bg-primary" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">{arrivalTime}</div>
                        <div className="text-xs text-secondary">{formattedArrivalDate}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <TrainIcon />
                    <span className="text-primary ml-2">{name}</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-2 max-w-[320px]">
                {standart && <Ticket tripId={id} type='standart' price={standart.price} availablePlaces={standart.seats} onTicketClick={handleTicketClick} />}
                {vip && <Ticket tripId={id} type='vip' price={vip.price} availablePlaces={vip.seats} onTicketClick={handleTicketClick} />}
            </div>
        </div>
    )
}

export default CardItem