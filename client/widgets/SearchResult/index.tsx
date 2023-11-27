import { getTripsByQueryParams, getTripsInfoByTripsIds } from "@/api/trips"
import CardList from "@/components/CardList"
import useSearchQueryParams from "@/hooks/useSearchQueryParams"
import { TFindTripsResponse, ISearchResultData, ITripInfo, TTripInfoResponse, TTripsIds, IFindTrip } from "@/types/trip"
import React, { useMemo } from "react"

interface ISearchResultProps {
    searchResultData: ISearchResultData[]
}

const SearchResult = (props: ISearchResultProps) => {
    const { searchResultData } = props

    return (
        <React.Fragment>
            <h2 className="text-xl p-4 font-medium">Search Result</h2>
            <div className="flex justify-between mb-3 px-4 gap-6 text-secondary">
                <div className="min-w-[380px] max-w-[380px] flex-1 flex justify-between">
                    <div>Departure</div>
                    <div className="mr-3">Arrival</div>
                </div>
                <div className="mr-[160px]">Price</div>
            </div>
            <CardList data={searchResultData} />
        </React.Fragment>
    )
}

export default SearchResult