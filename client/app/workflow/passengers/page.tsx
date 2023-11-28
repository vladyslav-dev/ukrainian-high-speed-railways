"use client"

import Accordion from '@/components/Accordion'
import Button from '@/components/Button'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import { TBuyTicketsPayload } from '@/types/ticket'
import { ISelectedSeat } from '@/widgets/SelectSeats'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'

interface IAccordionRenderData {
  [key: string]: ISelectedSeat[]
}

interface IInputDetails {
  value: string
  error: string
}

interface IFormDataItem {
  firstName: IInputDetails
  lastName: IInputDetails
}

interface IFormData {
  [key: string]: IFormDataItem
}

export default function Passengers() {

  const router = useRouter()

  const { selectedSeats, setBuyTicketPayload } = useWorkflowStore()

  const [formData, setFormData] = useState<IFormData>(() => {
    return selectedSeats.reduce<IFormData>((acc, item: ISelectedSeat) => {
      acc[item.seatId] = {
        firstName: {
          value: "",
          error: ""
        },
        lastName: {
          value: "",
          error: ""
        }
      }
      return acc
    }, {})
  })

  const [phone, setPhone] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const accordionRenderData = useMemo<IAccordionRenderData>(() => {
    return selectedSeats.reduce<IAccordionRenderData>((acc, item: ISelectedSeat) => {
       acc[item.tripId] ? (acc[item.tripId].push(item)) : (acc[item.tripId] = [item])
       return acc
    }, {})
  }, [])

  const getFormattedDate = (item: ISelectedSeat): string => {
    const arrivalDate = new Date(item.tripArrivalDate)
    const departureDate = new Date(item.tripDepartureDate)

    return `${arrivalDate.toLocaleString()} - ${departureDate.toLocaleString()}`
  }

  const handleFormUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const seatId = String(event.target.dataset.seatId)

    setFormData((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        [event.target.name]: {
          value: event.target.value,
          error: ""
        }
      }
    }))
  }

  const isFormValid = (): boolean => {
    return Object.values(formData).every(item => Boolean(item.firstName.value.trim() && item.lastName.value.trim()))
  }

  const onBackClick = () => {
    router.back()
  }

  const onNextClick = () => {
    console.log('isFormValid', isFormValid())

    const payload: TBuyTicketsPayload = Object.keys(formData).map(seatId => ({
      seat_id: Number(seatId),
      firstName: formData[seatId].firstName.value,
      middleName: null,
      lastName: formData[seatId].lastName.value,
      email: email,
      phone: phone,
    }))

    setBuyTicketPayload(payload)
  }

  console.log('accordionRenderData', accordionRenderData)

  console.log('selectedSeats', selectedSeats)

  return (
    <React.Fragment>
      <div className='h-full p-4 overflow-auto'>
        <h2 className='text-xl font-medium mb-3'>Passenger Data</h2>
        <div className='flex flex-col gap-3'>
          {Object.keys(accordionRenderData).map((tripId, index) => (
            <Accordion key={tripId} expanded={!index} title={accordionRenderData[tripId][0].tripName} subTitle={getFormattedDate(accordionRenderData[tripId][0])}>
              <div className='pl-6 pt-3'>
                {accordionRenderData[tripId].map((item: ISelectedSeat, index) => (
                    <React.Fragment key={item.seatId}>
                      <div className='flex flex-col my-4'>
                        <h4 className='font-medium'>Passenger {index + 1}</h4>
                        <span className='text-secondary font-normal text-xs'>Wagon {item.wagonNumber}, Place {item.seatNumber} - {item.wagonType}</span>
                      </div>
                      <div className='flex items-center gap-3'>
                        <input
                          className='h-[38px] w-[200px] border border-stroke rounded-[4px] px-3'
                          value={formData[item.seatId].firstName.value}
                          name='firstName'
                          placeholder='First Name'
                          onChange={handleFormUpdate}
                          data-seat-id={String(item.seatId)}
                        />
                        <input
                          className='h-[38px] w-[200px] border border-stroke rounded-[4px] px-3'
                          value={formData[item.seatId].lastName.value}
                          name='lastName'
                          placeholder='Last Name'
                          onChange={handleFormUpdate}
                          data-seat-id={String(item.seatId)}
                        />
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            </Accordion>
          ))}
          <Accordion title={"Contacts"}>
            <div className='pl-6 pt-3'>
              <div className='flex items-center gap-3'>
                <input
                  className='h-[38px] w-[200px] border border-stroke rounded-[4px] px-3'
                  value={email}
                  name='email'
                  placeholder='Email'
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input
                  className='h-[38px] w-[200px] border border-stroke rounded-[4px] px-3'
                  value={phone}
                  name='phone'
                  placeholder='Phone'
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>
            </div>
          </Accordion>
        </div>
      </div>
      <div className='h-[90px] p-4 flex justify-end items-center border-t-2 border-stroke'>
      <Button label='Back' onClick={onBackClick} size='medium' variant='outlined' />
      <Button disabled={!isFormValid()} label='Next' onClick={onNextClick} size='medium' className='ml-4' />
    </div>
  </React.Fragment>
  )
}

