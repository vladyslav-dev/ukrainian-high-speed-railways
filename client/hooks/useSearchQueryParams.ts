import { useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { TSearchTripsQueryParams } from "@/types/trip"

const useSearchQueryParams = (): TSearchTripsQueryParams => {
    const searchParams = useSearchParams()

    const originCity = searchParams.get('originCity')
    const destinationCity = searchParams.get('destinationCity')
    const departureDate = searchParams.get('departureDate')
    const arrivalDate = searchParams.get('arrivalDate')

    const tripsQueryParams = useMemo(() => {
        const departureDateISO = departureDate ? new Date(departureDate).toISOString() : null
        const arrivalDateISO = arrivalDate ? new Date(arrivalDate).toISOString() : null

        const originCityQuery = originCity ? `originCity=${originCity}` : ''
        const destinationCityQuery = destinationCity ? `&destinationCity=${destinationCity}` : ''
        const fromDateQuery = departureDateISO ? `&fromDate=${departureDateISO}` : ''
        const toDateQuery = arrivalDateISO ? `&toDate=${arrivalDateISO}` : ''

        return { originCityQuery, destinationCityQuery, fromDateQuery, toDateQuery }
    }, [originCity, destinationCity, departureDate, arrivalDate])

    return tripsQueryParams
}

export default useSearchQueryParams