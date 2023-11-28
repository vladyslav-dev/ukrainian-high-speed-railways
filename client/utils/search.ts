import { IFindTrip, ISearchResultData, ITripInfo } from "@/types/trip"
import { useMemo } from "react"

interface IPrepareSearchResultDataParams {
    trips: IFindTrip[]
    tripsInfo: ITripInfo[]
}

export const prepareSearchResultData = ({ trips, tripsInfo }: IPrepareSearchResultDataParams): ISearchResultData[] => {
    if (!tripsInfo.length || !trips.length) return []

    const tripsInfoMap = Object.assign({}, ...tripsInfo.map((item: ITripInfo) => ({ [item.tripId]: item })))
    
    if (trips.every((item: IFindTrip) => !item.returned)) {
        /* One Way Trip */

        return trips.map((item: IFindTrip) => ({
            trip: {
                ...item.trip,
                standart: tripsInfoMap[item.trip.id].standart,
                vip: tripsInfoMap[item.trip.id].vip
            },
            backTrip: null
        }))
    } else {
        /* Round Trip */

        const result: ISearchResultData[] = []

        for (let i = 0; i < trips.length; i++) {
            if (trips[i].returned) {
                continue
            }

            for (let j = 0; j < trips.length; j++) {
                if (trips[j].returned) {
                    result.push({
                        trip: {
                            ...trips[i].trip,
                            standart: tripsInfoMap[trips[i].trip.id].standart,
                            vip: tripsInfoMap[trips[i].trip.id].vip
                        },
                        backTrip: {
                            ...trips[j].trip,
                            standart: tripsInfoMap[trips[j].trip.id].standart,
                            vip: tripsInfoMap[trips[j].trip.id].vip
                        }
                    })
                }
            }
        }

        return result
    }
}