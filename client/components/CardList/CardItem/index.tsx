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
                <div className="flex items-center w-full justify-center">
                    <div className="min-w-[20px] flex-1 max-w-[170px] h-[1px] bg-primary" />
                    <div className="flex items-center mx-2">
                        <ClockIcon />
                        <span className="text-primary ml-2">{diffTime}</span>
                    </div>
                    <div className="min-w-[20px] flex-1 max-w-[170px] h-[1px] bg-primary" />
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

    console.log('trip', trip)
    console.log('backTrip', backTrip)

    return (
        <div className="flex items-center justify-between bg-white rounded-[6px] p-4 whitespace-nowrap" style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}>
            <div className="flex w-[60%] flex-col justify-between gap-4 pr-5">
                <Trip {...trip} />
                {!!backTrip && (
                    <React.Fragment>
                        <div className="h-[1px] bg-stroke my-2" style={{ width: "calc(100% + 20px)"}} />
                        <Trip {...backTrip} />
                    </React.Fragment>
                )}

            </div>
            <div className="flex flex-col flex-1 h-full border-l border-r border-stroke">
                <div className="flex flex-1 flex-col gap-2 p-4 text-xs text-secondary">
                    <span>{trip.standart.seats} Standart place(s) available</span>
                    <span>{trip.vip.seats} VIP place(s) available</span>
                </div>
                {!!backTrip && (
                    <React.Fragment>
                        <div className="w-full h-[1px] bg-stroke my-2" />
                        <div className="flex flex-1 flex-col gap-2 p-4 text-xs text-secondary">
                            <span>{backTrip.standart.seats} Standart place(s) available</span>
                            <span>{backTrip.vip.seats} VIP place(s) available</span>
                        </div>
                    </React.Fragment>
                )}
            </div>
            <div className="flex flex-col flex-1 h-full max-w-[320px]">
                <div className="flex flex-col items-center justify-end h-full px-4 py-2 pr-0 pb-0">
                    <div className={`flex items-center ${!!backTrip ? "mb-14" : "mb-4"}`}>
                        <span className="text-lg font-semibold">From {minPrice} USD</span>
                    </div>
                    <Button label={'Select seats'} disabled={!isAvailable} onClick={handleTicketClick} size='medium' className="w-full" />
                    {!isAvailable && <span className="text-xs text-secondary">No available seats</span>}
                </div>
            </div>
        </div>
    )
}

export default CardItem