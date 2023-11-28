import { useSearchParams } from "next/navigation"
import { TSearchTripsQueryParams } from "@/types/trip"

import { getTripsByQueryParams, getTripsInfoByTripsIds } from "@/api/trips"
import useSearchQueryParams from "@/hooks/useSearchQueryParams"
import { TFindTripsResponse, ISearchResultData, ITripInfo, TTripInfoResponse, TTripsIds, IFindTrip } from "@/types/trip"
import { useEffect, useMemo, useState } from "react"
import useSWR from 'swr'
import { useWorkflowStore } from "@/stores/useWorkflowStore"
import { prepareSearchResultData } from "@/utils/search"

interface IUseSearchResultData {
    isLoading: boolean
    error: any
    data: ISearchResultData[]
}

// const useSearchResultData = (): IUseSearchResultData => {

//     const { searchResultData, setSearchResultData } = useWorkflowStore()

//     const searchQueryParams = useSearchQueryParams()
//     const { originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery } = searchQueryParams

//     /* API - Gets All Trips By Query Params */
//     const {
//         data: trips = [],
//         error: tripsError,
//         isLoading: isTripsLoading,
//     } = useSWR<TFindTripsResponse>(
//         `/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`,
//         () => getTripsByQueryParams(searchQueryParams)
//     )

//     const tripsIds = useMemo<TTripsIds>(() => {
//         return trips.map((item: IFindTrip) => item.trip.id)
//     }, [trips])

//     /* API - Gets Trips Info By Trips Ids */
//     const {
//         data: tripsInfo,
//         error: tripsInfoError,
//         isLoading: isTripsInfoLoading
//     } = useSWR<TTripInfoResponse>(
//         `/api/Trip/TripsInfosByTripsIds/${JSON.stringify(tripsIds)}`,
//         trips.length ? () => getTripsInfoByTripsIds(tripsIds) : () => [],
//         { onSuccess: async (data) => {
//             const result = prepareSearchResultData({ trips, tripsInfo: data })

//             setSearchResultData(result)
//         }
//         }
//     )

//     return {
//         isLoading: isTripsLoading || isTripsInfoLoading,
//         error: tripsError || tripsInfoError,
//         data: searchResultData
//     }
// }

/* Temporary Solution */

const useSearchResultData = (): IUseSearchResultData => {
    const { searchResultData, setSearchResultData } = useWorkflowStore();

    const searchQueryParams = useSearchQueryParams();
    const { originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery } = searchQueryParams;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                const tripsData = await getTripsByQueryParams(searchQueryParams)

                const trips = tripsData || [];

                const tripsIds = trips.map((item: IFindTrip) => item.trip.id);

                let tripsInfo: TTripInfoResponse = [];
                if (trips.length > 0) {
                    tripsInfo = await getTripsInfoByTripsIds(tripsIds)
                }

                const result = prepareSearchResultData({ trips, tripsInfo });
                setSearchResultData(result);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery, setSearchResultData]);

    return { isLoading: loading, error, data: searchResultData };
};

export default useSearchResultData