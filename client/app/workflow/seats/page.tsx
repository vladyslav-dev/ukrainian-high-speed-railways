"use client"

import { getWagonsAndSeatsByTripId, getTripById } from '@/api/trips'
import Button from '@/components/Button'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import { IWagonsAndSeatsResponse } from '@/types/wagon'
import SelectSeats from '@/widgets/SelectSeats'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import useSWR from 'swr'

export default function Seats() {

  const { activeTrip, selectedSeats, setActiveTrip } = useWorkflowStore()

  const router = useRouter()

  const searchParams = useSearchParams()
  const tripId = searchParams.get('tripId')
  const backTripId = searchParams.get('backTripId')

  const isBackTrip = !!backTripId

  /* API - Get Wagons and Seats */
  const {
      data: wagons,
      error: wagonsError,
      isLoading: isWagonsLoading
  } = useSWR<IWagonsAndSeatsResponse>(`/api/Trip/GetWagonsAndSeatsByTripId/${backTripId || tripId}`, tripId ? () => getWagonsAndSeatsByTripId(backTripId || tripId) : null)

  const onBackClick = () => {
    router.back()
  }

  const onNextClick = () => {

    if (activeTrip?.backTrip && !isBackTrip) {
      router.push(`/workflow/seats?tripId=${tripId}&backTripId=${activeTrip.backTrip.id}`)
    } else {
      router.push(`/workflow/passengers`)
    }
  }
  
  const trip = activeTrip?.backTrip && isBackTrip ? activeTrip.backTrip : activeTrip?.trip

  const title = isBackTrip ? 'Select seat(s) - Return Journey' : 'Select seat(s) - Outbound Journey'

  if (isWagonsLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Loading...</p>
        </div>
    )
  } else {
    return wagons && activeTrip && trip ? (
      <React.Fragment>
        <SelectSeats trip={trip} wagons={wagons} title={title} />
        <div className='h-[90px] p-4 flex justify-end items-center border-t-2 border-stroke'>
          <Button label='Back' onClick={onBackClick} size='medium' variant='outlined' />
          <Button disabled={!Boolean(selectedSeats.length)} label='Next' onClick={onNextClick} size='medium' className='ml-4' />
        </div>
      </React.Fragment>
    ) : <p>Something went wrong, try to &quot;Find&quot; the trip again</p>
  }
}
