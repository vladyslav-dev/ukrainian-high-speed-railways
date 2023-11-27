import { ISearchResultData, ISearchResultTrip } from '@/types/trip'
import { create } from 'zustand'

interface WorkflowStore {
    searchResultData: ISearchResultData[]
    setSearchResultData: (searchResultData: ISearchResultData[]) => void

    activeTrip: ISearchResultData | null
    setActiveTrip: (activeTrip: ISearchResultData | null) => void

    selectedSeats: string[]
    setSelectedSeats: (selectedSeats: string[]) => void
}

export const useWorkflowStore = create<WorkflowStore>()((set, get) => ({
    searchResultData: [],
    setSearchResultData: (searchResultData: ISearchResultData[]) => set({ searchResultData }),

    activeTrip: null,
    setActiveTrip: (activeTrip: ISearchResultData | null) => set({ activeTrip }),

    selectedSeats: [],
    setSelectedSeats: (selectedSeats: string[]) => set({ selectedSeats })
}))