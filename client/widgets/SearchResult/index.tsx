"use client"

import { getTripsByQueryParams, getTripsInfoByTripsIds } from "@/api/trips"
import CardList from "@/components/CardList"
import useSearchQueryParams from "@/hooks/useSearchQueryParams"
import { mockSearchResults } from "@/services/mockSearchResult"
import { ITrip, ITripInfo, TTripInfoResponse, TTripResponse, TTripsIds } from "@/types/trips"

import { useMemo } from "react"
import useSWR from 'swr'

const SearchResult = () => {
    const searchQueryParams = useSearchQueryParams()
    const { originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery } = searchQueryParams

    /* API - Gets All Trips By Query Params */
    const { 
        data: trips = [], 
        error: tripsError, 
        isLoading: isTripsLoading 
    } = useSWR<TTripResponse>(
        `/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`, 
        () => getTripsByQueryParams(searchQueryParams)
    )

    const tripsIds = useMemo<TTripsIds>(() => {
        return trips.map((trip: ITrip) => trip.id)
    }, [trips])

    /* API - Gets Trips Info By Trips Ids */
    const { 
        data: tripsInfo = [], 
        error: tripsInfoError, 
        isLoading: isTripsInfoLoading 
    } = useSWR<TTripInfoResponse>(
        `/api/Trip/TripsInfosByTripsIds/${JSON.stringify(tripsIds)}`, 
        trips.length ? () => getTripsInfoByTripsIds(tripsIds) : null
    )
   
    const getSearchResultData = () => {
        const tripsInfoMap = Object.assign({}, ...tripsInfo.map((item: ITripInfo) => ({ [item.tripId]: item })))

        return trips.map((trip: ITrip) => {
            return {
                ...trip,
                standart: tripsInfoMap[trip.id].standart,
                vip: tripsInfoMap[trip.id].vip,
            }
        })
    }

    console.log('searchResults', getSearchResultData())

    return (
        <>
            <h2 className="text-xl p-4 font-medium">Search Result</h2>
            <div className="flex justify-between mb-3 px-4 gap-6 text-secondary">
                <div className="min-w-[380px] max-w-[380px] flex-1 flex justify-between">
                    <div>Departure</div>
                    <div className="mr-3">Arrival</div>
                </div>
                <div className="mr-[160px]">Price</div>
            </div>
            <CardList data={mockSearchResults} />
        </>
    )
}

export default SearchResult