'use client';

import React, { useState, useEffect, useRef } from 'react'
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchTicketsSchema } from "@/utils/validationSchemas";
import { getCities } from "@/services/mockCities";
import Autocomplete from "@/components/Autocomplete";
import DateRangeField from '@/components/DateRangeField';
import { SearchFormEnum, TCityRange, TDateRangeValue } from '@/types';

// interface IFormInput {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

interface ISearchTicketsForm {
  originCity: string;
  destinationCity: string;
  departureDate: Date;
  arrivalDate?: Date | null;
}


export default function SearchTicketsForm() {

  const [cities, setCities] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const searchFormDataRef = useRef<ISearchTicketsForm>({
    originCity: '',
    destinationCity: '',
    departureDate: new Date(),
    arrivalDate: null,
  })

 
 
  useEffect(() => {
    getCities().then((cities) => {
      setCities(cities)
      setIsFetching(false)
    })
  }, [])

  const onSubmit = () => {

  }

  const setSearchFormData = (value: any) => {
    searchFormDataRef.current = {
      ...searchFormDataRef.current,
      ...value,
    };
  }


  return (
    <div>
      <Autocomplete 
        label='From' 
        isFetching={isFetching} 
        options={cities} 
        formKey={SearchFormEnum.originCity}
        setFormValueCallback={(value: TCityRange) => setSearchFormData(value)}
        className="rounded-tl-[6px] rounded-bl-[6px] mr-1"
      />
      <Autocomplete 
        label='To' 
        isFetching={isFetching} 
        options={cities} 
        formKey={SearchFormEnum.destinationCity}
        setFormValueCallback={(value: TCityRange) => setSearchFormData(value)}
      />
      <DateRangeField
        formKey={SearchFormEnum.dateRange}
        setFormValueCallback={(value: TDateRangeValue) => setSearchFormData({ 
          [SearchFormEnum.dateRange]: value 
        })}
      />

      <button type="submit" onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </div>
  )
}
  