"use client"

import CardList from "@/components/CardList"
import { mockSearchResults } from "@/services/mockSearchResult"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const SearchResult = () => {
    const searchParams = useSearchParams();

    const originCity = searchParams.get('originCity');
    const destinationCity = searchParams.get('destinationCity');
    const departureDate = searchParams.get('departureDate');
    const arrivalDate = searchParams.get('arrivalDate');

    useEffect(() => {
        const departureDateISO = departureDate ? new Date(departureDate).toISOString() : null
        const arrivalDateISO = arrivalDate ? new Date(arrivalDate).toISOString() : null

        const originCityQuery = originCity ? `originCity=${originCity}` : ''
        const destinationCityQuery = destinationCity ? `&destinationCity=${destinationCity}` : ''
        const fromDateQuery = departureDateISO ? `&fromDate=${departureDateISO}` : ''
        const toDateQuery = arrivalDateISO ? `&toDate=${arrivalDateISO}` : ''

        console.log('SearchResult render')

        fetch(`http://localhost:5282/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`)
            .then(res => res.json())
            .then(data => {
                console.log('data', data)

                return data.map((item: any) => item.id)
            })
            .then(data => {
                console.log('JSON.stringify(data)', JSON.stringify(data))
                fetch("http://localhost:5282/api/Seat/SeatsByTripsIds", { method: "POST", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
                    .then(response => response.json())
                    .then(data => {
                        console.log('SeatsByTripsIds data', data)
                    })
            })

    }, [])

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