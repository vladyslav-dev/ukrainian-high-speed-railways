import CardList from "@/components/CardList"
import { ISearchResultData } from "@/types/trip"
import Image from "next/image"
import React from "react"

interface ISearchResultProps {
    searchResultData: ISearchResultData[],
    isLoading: boolean
}

const SearchResult = (props: ISearchResultProps) => {
    const { searchResultData, isLoading } = props

    return (
        <React.Fragment>
            {searchResultData.length && !isLoading
                ?
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
                : 
                    <div className="h-3/4 flex justify-center items-center">
                        <Image priority width={512} height={512} src={"/not-found.jpg"} alt="Not-found"/>
                        <div className="max-w-[330px] w-full flex flex-col gap-5">
                            <h1 className="text-2xl">No Tickets Found</h1>
                            <p>Sorry, no tickets found for your selected dates or cities. Please review your choices or contact our customer support for assistance.</p>
                        </div>
                    </div>
            }
        </React.Fragment>
    )
}

export default SearchResult