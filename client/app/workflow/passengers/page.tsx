"use client"

import Accordion from '@/components/Accordion'
import Button from '@/components/Button'
import SomethingWentWrong from '@/components/SomethingWentWrong'
import Toaster from '@/components/Toaster'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import { TBuyTicketsPayload } from '@/types/ticket'
import { ISelectedSeat } from '@/widgets/SelectSeats'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import InputMask from 'react-input-mask';

interface IAccordionRenderData {
  [key: string]: ISelectedSeat[]
}

interface IInputDetails {
  value: string
  error: boolean
}

type TFieldName = 'firstName' | 'lastName'

interface IFormDataItem {
  firstName: IInputDetails
  lastName: IInputDetails
}

interface IFormData {
  [key: string]: IFormDataItem
}

const isEmailValid = (email: string): boolean => {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return re.test(String(email).toLowerCase())
}

const isPhoneValid = (phone: string): boolean => {
  const re = /^\+38\s\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/

  return re.test(String(phone).toLowerCase())
}

export default function Passengers() {

  const router = useRouter()

  const { selectedSeats, setBuyTicketPayload } = useWorkflowStore()

  const [formData, setFormData] = useState<IFormData>(() => {
    return selectedSeats.reduce<IFormData>((acc, item: ISelectedSeat) => {
      acc[item.seatId] = {
        firstName: {
          value: "",
          error: false
        },
        lastName: {
          value: "",
          error: false
        }
      }
      return acc
    }, {})
  })

  const [phone, setPhone] = useState<IInputDetails>({ value: "", error: false })
  const [email, setEmail] = useState<IInputDetails>({ value: "", error: false })

  const [showErrorToaster, setShowErrorToaster] = useState<boolean>(false)

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
          error: false
        }
      }
    }))
  }

  const handleContactFormUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name

    switch (fieldName) {
      case 'phone':
        setPhone({
          value: event.target.value,
          error: false
        })
        break
      case 'email':
        setEmail({
          value: event.target.value,
          error: false
        })
        break
    }
  }

  const setInvalidField = (seatId: string, fieldName: TFieldName) => {
    setFormData((prev) => ({
      ...prev,
      [seatId]: {
        ...prev[seatId],
        [fieldName]: {
          ...prev[seatId][fieldName],
          error: true
        }
      }
    }))
  }

  const validatePassengerForm = (): { isValid: boolean } => {
    const result = Object.keys(formData).map((item) => {
      const firstNameValid = Boolean(formData[item].firstName.value.trim())
      const lastNameValid = Boolean(formData[item].lastName.value.trim())

      if (!firstNameValid) {
        setInvalidField(item, 'firstName')
      }

      if (!lastNameValid) {
        setInvalidField(item, 'lastName')
      }

      return Boolean(firstNameValid && lastNameValid)
    })

    const isValid = result.every(Boolean)

    return { isValid }
  }

  const validateForm = (): { isValid: boolean } => {
    const emailValid = isEmailValid(email.value)
    const phoneValid = isPhoneValid(phone.value)
    const { isValid: isPassengersValid } = validatePassengerForm()

    if (!emailValid) {
      setEmail((prev) => ({...prev, error: true }))
    }

    if (!phoneValid) {
      setPhone((prev) => ({...prev, error: true }))
    }

    return { isValid: Boolean(emailValid && phoneValid && isPassengersValid) }
  }

  const createPayload = (): TBuyTicketsPayload => {
    return Object.keys(formData).map(seatId => ({
      seat_id: Number(seatId),
      firstName: formData[seatId].firstName.value,
      middleName: "",
      lastName: formData[seatId].lastName.value,
      email: email.value,
      phone: phone.value,
    }))
  }

  const onBackClick = () => {
    router.back()
  }

  const onNextClick = () => {
    const { isValid } = validateForm()

    if (isValid) {
      const payload: TBuyTicketsPayload = createPayload()

      setBuyTicketPayload(payload)

      router.push('/workflow/payment')
    } else [
      setShowErrorToaster(true)
    ]
  }

  const onToasterClose = () => {
    setShowErrorToaster(false)
  }

  if (selectedSeats.length === 0) {
    return <SomethingWentWrong />
  } else {
    return (
        <React.Fragment>
          <div className='h-full p-4 overflow-auto'>
            <h2 className='text-xl font-medium mb-3'>Passenger Data</h2>
            <div className='flex flex-col gap-3'>
              {Object.keys(accordionRenderData).map((tripId, index) => (
                <Accordion
                  key={tripId}
                  expanded
                  errorHighlight={formData[accordionRenderData[tripId][0].seatId].firstName.error || formData[accordionRenderData[tripId][0].seatId].lastName.error}
                  title={accordionRenderData[tripId][0].tripName}
                  subTitle={getFormattedDate(accordionRenderData[tripId][0])}
                >
                  <div className='pl-6 pt-3'>
                    {accordionRenderData[tripId].map((item: ISelectedSeat, index) => (
                        <React.Fragment key={item.seatId}>
                          <div className='flex flex-col my-4'>
                            <h4 className='font-medium'>Passenger {index + 1}</h4>
                            <span className='text-secondary font-normal text-xs'>Wagon {item.wagonNumber}, Place {item.seatNumber} - {item.wagonType}</span>
                          </div>
                          <div className='flex items-center gap-3'>
                            <input
                              className={`h-[38px] w-[200px] border rounded-[4px] px-3 ${formData[item.seatId].firstName.error ? 'border-danger' : 'border-stroke'}`}
                              value={formData[item.seatId].firstName.value}
                              name='firstName'
                              placeholder='First Name'
                              onChange={handleFormUpdate}
                              data-seat-id={String(item.seatId)}
                            />
                            <input
                              className={`h-[38px] w-[200px] border rounded-[4px] px-3 ${formData[item.seatId].lastName.error ? 'border-danger' : 'border-stroke'}`}
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
              <Accordion expanded title={"Contacts"} errorHighlight={email.error || phone.error}>
                <div className='pl-6 pt-3'>
                  <div className='flex items-center gap-3'>
                    <input
                      className={`h-[38px] w-[200px] border rounded-[4px] px-3 ${email.error ? 'border-danger' : 'border-stroke'}`}
                      value={email.value}
                      name='email'
                      placeholder='Email'
                      onChange={handleContactFormUpdate}
                    />
                    <InputMask
                      mask="+38 (099) 999-99-99"
                      name='phone'
                      type='tel'
                      placeholder='Phone'
                      value={phone.value}
                      onChange={handleContactFormUpdate}
                      className={`h-[38px] w-[200px] border rounded-[4px] px-3 ${phone.error ? 'border-danger' : 'border-stroke'}`}
                    />
                  </div>
                </div>
              </Accordion>
            </div>
            <Toaster
              type="error"
              message='Kindly ensure that every field is completed before proceeding.'
              showToaster={showErrorToaster}
              onCloseClick={onToasterClose}
            />
          </div>
          <div className='h-[90px] p-4 flex justify-end items-center border-t-2 border-primary'>
            <Button label='Back' onClick={onBackClick} size='medium' variant='outlined' />
            <Button label='Next' onClick={onNextClick} size='medium' className='ml-4' />
          </div>
      </React.Fragment>
    )
  }
}

