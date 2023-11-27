"use client"

import SearchResult from '@/widgets/SearchResult'
import useSearchResultData from '@/hooks/useSearchResultData'

export default function Search() {
  const { data, error, isLoading } = useSearchResultData()

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-semibold">Loading...</p>
        </div>
    )
  } else {
    return (
      <SearchResult searchResultData={data} />
    )
  }
}
