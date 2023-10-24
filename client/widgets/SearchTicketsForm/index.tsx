'use client'

import React, { useState, useEffect } from 'react'
import { getCities } from "@/services/mockCities"
import Autocomplete from "@/components/Autocomplete"
import DateRangeField from '@/components/DateRangeField'
import Button from '@/components/Button'

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
    <div className='flex items-center'>
      <div className='mr-1'>
        <Autocomplete
          label='From'
          inputValue={searchFormData.originCity}
          onInputChange={(value) => setSearchFormData(prevState => ({ ...prevState, originCity: value }))}
          isFetching={isFetching}
          options={cities}
          className="rounded-tl-[6px] rounded-bl-[6px]"
        />
      </div>
      <div className='mr-1'>
        <Autocomplete
          label='To'
          inputValue={searchFormData.destinationCity}
          onInputChange={(value) => setSearchFormData(prevState => ({ ...prevState, destinationCity: value }))}
          isFetching={isFetching}
          options={cities}
        />
      </div>
      <div>
        <DateRangeField
          startDateLabel='Depart'
          endDateLabel='Return'
          defautlStartDate={searchFormData.departureDate}
          defaultEndDate={searchFormData.arrivalDate}
          onStartDateChange={(value) => setSearchFormData(prevState => ({ ...prevState, departureDate: value }))}
          onEndDateChange={(value) => setSearchFormData(prevState => ({ ...prevState, arrivalDate: value }))}
          endDateInputClassName="rounded-tr-[6px] rounded-br-[6px]"
        />
      </div>
      <Button label="Find" onClick={onSubmit} className='ml-3' />
    </div>
  )
}