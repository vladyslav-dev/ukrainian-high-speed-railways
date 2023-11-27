import { ISearchResultData, ITrip, TFindTripsResponse, TSearchTripsQueryParams, TTripInfoResponse, TTripsIds } from "@/types/trip"
import { IWagonsAndSeatsResponse } from "@/types/wagon"

export async function getTripsByQueryParams({
    originCityQuery,
    destinationCityQuery,
    fromDateQuery,
    toDateQuery
}: TSearchTripsQueryParams): Promise<TFindTripsResponse> {
    const res = await fetch(`https://uhr-server.azurewebsites.net/api/Trip/search?${originCityQuery}${destinationCityQuery}${fromDateQuery}${toDateQuery}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTripsInfoByTripsIds(tripsIds: TTripsIds): Promise<TTripInfoResponse> {
    const res = await fetch("https://uhr-server.azurewebsites.net/api/Trip/TripsInfosByTripsIds", {
        method: "POST",
        body: JSON.stringify(tripsIds),
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getWagonsAndSeatsByTripId(tripId: string): Promise<IWagonsAndSeatsResponse> {
    const res = await fetch(`https://uhr-server.azurewebsites.net/api/Trip/GetWagonsAndSeatsByTripId/${tripId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export async function getTripById(tripId: number): Promise<ISearchResultData> {
    const res = await fetch(`https://uhr-server.azurewebsites.net/api/Trip/${tripId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}