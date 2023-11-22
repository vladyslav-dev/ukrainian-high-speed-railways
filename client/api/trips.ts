import { TSearchTripsQueryParams, TTripInfoResponse, TTripResponse, TTripsIds } from "@/types/trips"

export async function getTripsByQueryParams({
    originCityQuery,
    destinationCityQuery,
    fromDateQuery,
    toDateQuery
}: TSearchTripsQueryParams): Promise<TTripResponse> {
    const res = await fetch(`http://localhost:5282/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`)
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTripsInfoByTripsIds(tripsIds: TTripsIds): Promise<TTripInfoResponse> {
    const res = await fetch("http://localhost:5282/api/Trip/TripsInfosByTripsIds", { 
        method: "POST", 
        body: JSON.stringify(tripsIds), 
        headers: { "Content-Type": "application/json" } 
    })
    
    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}