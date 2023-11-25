"use client"

import { getWagonsAndSeatsByTripId } from "@/api/trips"
import { useSearchParams } from "next/navigation"
import React, { useMemo } from "react"
import useSWR from 'swr'
import { IWagonsAndSeatsResponse, IWagonsResponse } from "@/types/wagon"

const SelectSeats = () => {
    const searchParams = useSearchParams()
    const tripId = searchParams.get('tripId')

    /* API - Gets All Trips By Query Params */
    const { 
        data: wagons, 
        error: wagonsError, 
        isLoading: isWagonsLoading 
    } = useSWR<IWagonsAndSeatsResponse>(`/api/Trip/GetWagonsAndSeatsByTripId/${tripId}`, tripId ? () => getWagonsAndSeatsByTripId(tripId) : null)

    console.log('wagons', wagons)


    if (isWagonsLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        )
    } else {
        return (
            <React.Fragment>
                <h2 className="text-xl p-4 font-medium">Search Result</h2>
                <div className="p-4 pt-0">
                    
                    <div className="flex items-center gap-7 mt-4">
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[14px] h-[14px] rounded-full bg-primary" />
                            <div className="text-sm">Selected</div>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[14px] h-[14px] rounded-full border border-stroke" />
                            <div className="text-sm">Busy</div>
                        </div>
                        <div className="flex items-center gap-[6px]">
                            <div className="w-[14px] h-[14px] rounded-full border border-primary" style={{ background: "rgba(37, 180, 145, 0.35)" }} />
                            <div className="text-sm">Free</div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {wagons && wagons.tripWagons.map((wagon: IWagonsResponse) => (
                            <div key={wagon.wagonId} className="mt-6">
                                <h3 className="mb-2 ml-2">Wagon 1</h3>
                                <div className="border-2 border-storke rounded-lg w-full h-[180px] flex flex-col justify-between p-2 max-w-[490px]">
                                    <div className="flex flex-col justify-between h-full text-sm">
                                        <div className="flex flex-wrap gap-[6px]">
                                            {wagon.wagonSeats.map((seat, index) => {
                                                return wagon.wagonSeats.length / 2 > index ? (
                                                    <div key={seat.id} className="w-[28px] h-[28px] flex justify-center items-center border border-primary rounded-md text-primary">
                                                        {seat.number}
                                                    </div>
                                                ) : null}
                                            )}
                                        </div>
                                        <div className="flex flex-wrap gap-[6px]">
                                            {wagon.wagonSeats.map((seat, index) => {
                                                return wagon.wagonSeats.length / 2 <= index ? (
                                                    <div key={seat.id} className="w-[28px] h-[28px] flex justify-center items-center border border-primary rounded-md text-primary">
                                                        {seat.number}
                                                    </div>
                                                ) : null}
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            </React.Fragment>
        )
    }
}

export default SelectSeats