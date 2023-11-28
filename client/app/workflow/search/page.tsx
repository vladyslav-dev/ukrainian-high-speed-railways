"use client"

import SearchResult from '@/widgets/SearchResult'
import useSearchResultData from '@/hooks/useSearchResultData'
import TrainLoader from '@/components/TrainLoader'

export default function Search() {
  const { data, error, isLoading } = useSearchResultData()

  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-screen">
          <TrainLoader />
        </div>
    )
  } else {
    return (
      <SearchResult searchResultData={data} isLoading={isLoading} />
    )
  }
}
