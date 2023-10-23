'use client'

import React, { useState, useEffect, useRef } from 'react'
import { getCities } from "@/services/mockCities"
import Autocomplete from "@/components/Autocomplete"
import DateRangeField from '@/components/DateRangeField'

interface ISearchTicketsForm {
  originCity: string
  destinationCity: string
  departureDate?: Date | null | undefined
  arrivalDate?: Date | null | undefined
}

export default function SearchTicketsForm() {

  const [cities, setCities] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)

  const [searchFormData, setSearchFormData] = useState<ISearchTicketsForm>({
    originCity: '',
    destinationCity: '',
    departureDate: null,
    arrivalDate: new Date(''),
  })

  useEffect(() => {
    getCities().then((cities) => {
      setCities(cities)
      setIsFetching(false)
    })
  }, [])

  const onSubmit = () => {
    console.log('searchFormData', searchFormData)
  }


  return (
    <div className=''>
      <Autocomplete
        label='From'
        inputValue={searchFormData.originCity}
        onInputChange={(value) => setSearchFormData(prevState => ({ ...prevState, originCity: value }))}
        isFetching={isFetching}
        options={cities}
        className="rounded-tl-[6px] rounded-bl-[6px] mr-1"
      />
      <Autocomplete
        label='To'
        inputValue={searchFormData.destinationCity}
        onInputChange={(value) => setSearchFormData(prevState => ({ ...prevState, destinationCity: value }))}
        isFetching={isFetching}
        options={cities}
      />
      <DateRangeField
        startDateLabel='Depart'
        endDateLabel='Return'
        defautlStartDate={searchFormData.departureDate}
        defaultEndDate={searchFormData.arrivalDate}
        onStartDateChange={(value) => setSearchFormData(prevState => ({ ...prevState, departureDate: value }))}
        onEndDateChange={(value) => setSearchFormData(prevState => ({ ...prevState, arrivalDate: value }))}
      />

      <button type="submit" onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  )
}
