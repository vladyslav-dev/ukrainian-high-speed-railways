'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCities } from "@/services/mockCities"
import Autocomplete from "@/components/Autocomplete"
import DateRangeField from '@/components/DateRangeField'
import Button from '@/components/Button'
import Toaster from '@/components/Toaster'

type TSearchFormCityInput = {
  value: string
  isValid: boolean
}

type TSearchFormDateInput = {
  value: Date | null | undefined
  isValid: boolean
}

interface ISearchTicketsForm {
  originCity: TSearchFormCityInput
  destinationCity: TSearchFormCityInput
  departureDate: TSearchFormDateInput
  arrivalDate: TSearchFormDateInput
}

export default function SearchTicketsForm() {

  const router = useRouter()
  const searchParams = useSearchParams();

  const originCity = searchParams.get('originCity');
  const destinationCity = searchParams.get('destinationCity');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate');
  console.log('departureDate', departureDate)
  console.log('arrivalDate', arrivalDate)

  const [cities, setCities] = useState<string[]>([])
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [showToaster, setShowToaster] = useState<boolean>(false)

  const [searchFormData, setSearchFormData] = useState<ISearchTicketsForm>({
    originCity: {
      value: originCity || '',
      isValid: true,
    },
    destinationCity: {
      value: destinationCity || '',
      isValid: true,
    },
    departureDate: {
      value: departureDate ? new Date(departureDate) : null,
      isValid: true,
    },
    arrivalDate: {
      value: arrivalDate ? new Date(arrivalDate) : new Date(''),
      isValid: true,
    },
  })

  useEffect(() => {
    getCities().then((cities) => {
      setCities(cities)
      setIsFetching(false)
    })
  }, [])

  const onToasterClose = () => {
    setShowToaster(false)
  }

  const isValidForm = () => {
    const originCityIsValid = cities.includes(searchFormData.originCity.value)
    const destinationCityIsValid = cities.includes(searchFormData.destinationCity.value)
    const departureDateIsValid = Boolean(searchFormData.departureDate.value)

    setSearchFormData(prevState => ({
      ...prevState,
      originCity: { ...prevState.originCity, isValid: originCityIsValid },
      destinationCity: { ...prevState.destinationCity, isValid: destinationCityIsValid },
      departureDate: { ...prevState.departureDate, isValid: departureDateIsValid },
    }))

    return Boolean(originCityIsValid && destinationCityIsValid && departureDateIsValid)
  }

  const onSubmit = () => {
    if (isValidForm()) {
      const originCityQuery = `originCity=${searchFormData.originCity.value}`
      const destinationCityQuery = `&destinationCity=${searchFormData.destinationCity.value}`
      const departureDateQuery = searchFormData.departureDate.value ? `&departureDate=${searchFormData.departureDate.value}` : ''
      const arrivalDateQuery = searchFormData.arrivalDate.value ? `&arrivalDate=${searchFormData.arrivalDate.value}` : ''

      router.push(`/workflow/search?${originCityQuery}${destinationCityQuery}${departureDateQuery}${arrivalDateQuery}`)
    } else {
      setShowToaster(true)
    }
  }

  return (
    <div className='flex items-center'>
      <div className='mr-1'>
        <Autocomplete
          label='From'
          options={cities}
          isFetching={isFetching}
          isValid={searchFormData.originCity.isValid}
          inputValue={searchFormData.originCity.value}
          className="rounded-tl-[6px] rounded-bl-[6px]"
          onInputChange={(value) => {
            setSearchFormData(prevState => ({
              ...prevState,
              originCity: { value, isValid: true }
            }))
          }}
        />
      </div>
      <div className='mr-1'>
        <Autocomplete
          label='To'
          options={cities}
          isFetching={isFetching}
          isValid={searchFormData.destinationCity.isValid}
          inputValue={searchFormData.destinationCity.value}
          onInputChange={(value) => {
            setSearchFormData(prevState => ({
              ...prevState,
              destinationCity: { ...prevState.destinationCity, value, isValid: true }
            }))
          }}
        />
      </div>
      <div>
        <DateRangeField
          startDateLabel='Depart'
          endDateLabel='Return'
          isStartDateValid={searchFormData.departureDate.isValid}
          isEndDateValid={true}
          defautlStartDate={searchFormData.departureDate.value}
          defaultEndDate={searchFormData.arrivalDate.value}
          endDateInputClassName="rounded-tr-[6px] rounded-br-[6px]"
          onStartDateChange={(value) => {
            setSearchFormData(prevState => ({
              ...prevState,
              departureDate: { ...prevState.departureDate, value, isValid: true }
            }))
          }}
          onEndDateChange={(value) => {
            setSearchFormData(prevState => ({
              ...prevState,
              arrivalDate: { ...prevState.arrivalDate, value, isValid: true }
            }))
          }}
        />
      </div>
      <Button label="Find" size="large" onClick={onSubmit} className='ml-3' />
      <Toaster showToaster={showToaster} onCloseClick={onToasterClose} />
    </div>
  )
}