"use client"

import Button from "@/components/Button"
import ClockIcon from "@/components/Icons/Clock"
import TrainIcon from "@/components/Icons/Train"
import { useWorkflowStore } from "@/stores/useWorkflowStore"
import { ISearchResultData, ISearchResultTrip } from "@/types/trip"
import { formatDate, formatDiffTime, getDiffTime } from "@/utils/date"
import { useRouter } from "next/navigation"
import React, { useMemo } from "react"


const Trip = (props: ISearchResultTrip) => {
    const { name, arrival_date, departure_date } = props

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

    return (
        <div className="flex flex-col gap-3">
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
    )
}

export interface ICardProps extends ISearchResultData {}

const CardItem = (props: ICardProps) => {
    const { trip, backTrip } = props

    const { setActiveTrip } = useWorkflowStore()

    const router = useRouter()

    const handleTicketClick = () => {
        router.push(`/workflow/seats?tripId=${trip.id}`)

        setActiveTrip({ trip, backTrip })
    }

    const isAvailable = useMemo(() => {
        return Boolean(
            (trip.standart.seats > 0 || trip.vip.seats > 0) && (backTrip ? (backTrip.standart.seats > 0 || backTrip.vip.seats > 0) : true)
        )
    }, [trip, backTrip])

    const minPrice = useMemo(() => {
        /* It supposed to be more complex logic, but I don't have enough time to implement it */
        return trip.standart.price + (backTrip ? backTrip.standart.price : 0)
    }, [trip, backTrip])

    return (
        <div className="flex gap-6 items-center justify-between bg-white rounded-[6px] p-4 whitespace-nowrap" style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}>
            <div className="flex flex-col justify-between gap-3 flex-1 min-w-[380px] max-w-[380px]">
                <Trip {...trip} />
                {!!backTrip && (
                    <React.Fragment>
                        <div className="w-full h-[1px] bg-stroke my-2" />
                        <Trip {...backTrip} />
                    </React.Fragment>
                )}

            </div>
            <div className="flex flex-col flex-1 gap-2 h-full max-w-[320px]">
                <div className="flex flex-col items-center justify-center gap-4 h-full px-4 py-2 border-2 border-primary rounded-[4px]">
                    <div className="flex items-center mr-3">
                        <span className="text-sm">From {minPrice} USD</span>
                    </div>
                    <Button label={'Select seats'} disabled={!isAvailable} onClick={handleTicketClick} size='medium' />
                    {!isAvailable && <span className="text-xs text-secondary">No available seats</span>}
                </div>
            </div>
        </div>
    )
}

export default CardItem