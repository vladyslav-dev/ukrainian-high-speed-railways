import CardList from "@/components/CardList"
import NotFound from "@/components/NotFound"
import { ISearchResultData } from "@/types/trip"
import React from "react"

interface ISearchResultProps {
    searchResultData: ISearchResultData[],
    isLoading: boolean
}

const SearchResult = (props: ISearchResultProps) => {
    const { searchResultData, isLoading } = props

    return (
        <React.Fragment>
            {searchResultData.length && !isLoading ? (
                <React.Fragment>
                    <h2 className="text-xl p-4 font-medium">Found {searchResultData.length} trip(s) for these dates</h2>
                    {/* <div className="flex justify-between mb-3 px-4 gap-6 text-secondary">
                        <div className="min-w-[380px] max-w-[380px] flex-1 flex justify-between">
                            <div>Departure</div>
                            <div className="mr-3">Arrival</div>
                        </div>
                        <div className="mr-[160px]">Price</div>
                    </div> */}
                    <CardList data={searchResultData} />
                </React.Fragment>
            ) : (
                <NotFound
                    title="No Tickets Found"
                    description="Sorry, no tickets found for your selected dates or cities. Please review your choices or contact our customer support for assistance."
                />
            )}
        </React.Fragment>
    )
}

export default SearchResult