import { useSearchParams } from "next/navigation"
import { TSearchTripsQueryParams } from "@/types/trip"

import { getTripsByQueryParams, getTripsInfoByTripsIds } from "@/api/trips"
import useSearchQueryParams from "@/hooks/useSearchQueryParams"
import { TFindTripsResponse, ISearchResultData, ITripInfo, TTripInfoResponse, TTripsIds, IFindTrip } from "@/types/trip"
import { useEffect, useMemo } from "react"
import useSWR from 'swr'
import { useWorkflowStore } from "@/stores/useWorkflowStore"
import { prepareSearchResultData } from "@/utils/search"

interface IUseSearchResultData {
    isLoading: boolean
    error: any
    data: ISearchResultData[]
}

const useSearchResultData = (): IUseSearchResultData => {

    const { searchResultData, setSearchResultData } = useWorkflowStore()

    const searchQueryParams = useSearchQueryParams()
    const { originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery } = searchQueryParams

    /* API - Gets All Trips By Query Params */
    const {
        data: trips = [],
        error: tripsError,
        isLoading: isTripsLoading,
    } = useSWR<TFindTripsResponse>(
        `/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`,
        () => getTripsByQueryParams(searchQueryParams)
    )

    const tripsIds = useMemo<TTripsIds>(() => {
        return trips.map((item: IFindTrip) => item.trip.id)
    }, [trips])

    /* API - Gets Trips Info By Trips Ids */
    const {
        error: tripsInfoError,
        isLoading: isTripsInfoLoading
    } = useSWR<TTripInfoResponse>(
        `/api/Trip/TripsInfosByTripsIds/${JSON.stringify(tripsIds)}`,
        trips.length ? () => getTripsInfoByTripsIds(tripsIds) : null,
        { onSuccess: (data) => {
            const result = prepareSearchResultData({ trips, tripsInfo: data })

            setSearchResultData(result)
        } }
    )

    return {
        isLoading: isTripsLoading || isTripsInfoLoading,
        error: tripsError || tripsInfoError,
        data: searchResultData
    }
}

export default useSearchResultData