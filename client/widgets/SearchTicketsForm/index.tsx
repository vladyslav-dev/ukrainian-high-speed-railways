'use client'

import React, { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import Autocomplete from "@/components/Autocomplete"
import DateRangeField from '@/components/DateRangeField'
import Button from '@/components/Button'
import Toaster from '@/components/Toaster'
import useSWR from 'swr'
import { getCities } from '@/api/cities'
import { ICity } from '@/types/city'

type TSearchFormCityInput = {
  value: string
  isValid: boolean
}

type DateInputValue = Date | null | undefined

type TSearchFormDateInput = {
  value: DateInputValue
  isValid: boolean
}

interface ISearchTicketsForm {
  originCity: TSearchFormCityInput
  destinationCity: TSearchFormCityInput
  departureDate: TSearchFormDateInput
  arrivalDate: TSearchFormDateInput
}

type TSearchQueryParams = 'originCity' | 'destinationCity' | 'departureDate' | 'arrivalDate'

interface ISearchTicketsFormProps {}

export default function SearchTicketsForm(props: ISearchTicketsFormProps) {
  const { data: cities = [], error, isLoading } = useSWR('/api/City', getCities)

  const router = useRouter()
  const searchParams = useSearchParams()

  const getCityValue = (paramName: TSearchQueryParams, defaultValue: string = ''): string => searchParams.get(paramName) || defaultValue
  const getDateTimeValue = (paramName: TSearchQueryParams, defaultValue: DateInputValue = null): DateInputValue => {
    const paramValue = searchParams.get(paramName)
    return paramValue ? new Date(paramValue) : defaultValue
  }

  const { originCity = '', destinationCity = '', departureDate = null, arrivalDate = new Date('') } = {
    originCity: getCityValue('originCity'),
    destinationCity: getCityValue('destinationCity'),
    departureDate: getDateTimeValue('departureDate'),
    arrivalDate: getDateTimeValue('arrivalDate', new Date('')),
  }

  const [showErrorToaster, setErrorToaster] = useState<boolean>(false)
  const [showSuccessToaster, setSuccessToaster] = useState<boolean>(false)
  const [searchFormData, setSearchFormData] = useState<ISearchTicketsForm>({
    originCity: {
      value: originCity,
      isValid: true,
    },
    destinationCity: {
      value: destinationCity,
      isValid: true,
    },
    departureDate: {
      value: departureDate,
      isValid: true,
    },
    arrivalDate: {
      value: arrivalDate,
      isValid: true,
    },
  })

  const cityNames = useMemo(() => {
    return cities.map((city: ICity) => city.name)
  }, [cities])

  const onToasterClose = () => {
    setErrorToaster(false)
    setSuccessToaster(false)
  }

  const isValidForm = () => {
    const originCityIsValid = cityNames.includes(searchFormData.originCity.value)
    const destinationCityIsValid = cityNames.includes(searchFormData.destinationCity.value)
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

      // setSuccessToaster(true)
    } else {
      setErrorToaster(true)
    }
  }

  return (
    <div className='flex items-center justify-center'>
      <div className='mr-1'>
        <Autocomplete
          label='From'
          options={cityNames}
          isFetching={isLoading}
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
          options={cityNames}
          isFetching={isLoading}
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
      <Toaster
        type='error'
        message='Please fill the required field to “Find” the tickets.'
        showToaster={showErrorToaster}
        onCloseClick={onToasterClose}
      />
      <Toaster
        type='success'
        message='All data is up to date.'
        showToaster={showSuccessToaster}
        onCloseClick={onToasterClose}
      />
    </div>
  )
}