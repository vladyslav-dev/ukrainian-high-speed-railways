import React from "react"
import CardItem from "./CardItem"
import { ISearchResultData } from "@/types/trip"

interface ICardListProps {
    data: ISearchResultData[]
}

const CardList = (props: ICardListProps) => {
    const { data } = props

    return (
        <div className="overflow-auto h-full p-4 flex flex-col gap-3 flex-1">
            {data.map((item, index) => <CardItem key={index} {...item} /> )}
            <p className="text-center text-secondary text-sm mt-2">Found {data.length} trip(s)</p>
        </div>
    )
}

export default React.memo(CardList)