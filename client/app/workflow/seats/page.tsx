"use client"

import { getWagonsAndSeatsByTripId } from '@/api/trips'
import Button from '@/components/Button'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import { IWagonsAndSeatsResponse, IWagonsResponse } from '@/types/wagon'
import SelectSeats from '@/widgets/SelectSeats'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo } from 'react'
import useSWR from 'swr'
import { Lexend_Giga } from 'next/font/google'
import Link from 'next/link'

const lexendGigaFont = Lexend_Giga({ subsets: ['latin'] })

export default function Seats() {

  const { activeTrip, selectedSeats } = useWorkflowStore()

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

  const sortedWagons = useMemo<IWagonsAndSeatsResponse | null>(() => {
    if (!wagons?.tripWagons) return null

    const sortedSeats = wagons.tripWagons.map((wagon: IWagonsResponse) => {
      return {
        ...wagon,
        seats: wagon.wagonSeats.sort((a, b) => {
          return a.number - b.number
        })
      }
    })

    const sortedTripWagons = sortedSeats.toSorted((a, b) => {
      return a.wagonNumber - b.wagonNumber
    })

    return {
      tripId: wagons?.tripId,
      tripWagons: sortedTripWagons
    }
  }, [wagons?.tripWagons])

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
    return sortedWagons && activeTrip && trip ? (
      <React.Fragment>
        <SelectSeats trip={trip} wagons={sortedWagons} title={title} />
        <div className='h-[90px] p-4 flex justify-end items-center border-t-2 border-primary'>
          <Button label='Back' onClick={onBackClick} size='medium' variant='outlined' />
          <Button disabled={!Boolean(selectedSeats.length)} label='Next' onClick={onNextClick} size='medium' className='ml-4' />
        </div>
      </React.Fragment>
    )
    :
    <div className='h-3/4 flex flex-col gap-5 justify-center items-center'>
        <Image priority src={"/went-wrong.jpg"} alt="Went wrong" width={695} height={252}/>
        <h1 className={lexendGigaFont.className}>Something went wrong, try to find the trip again!</h1>
        <Link href={"/"}>
          <Button label='Go Home'/>
        </Link>
    </div>
  }
}
