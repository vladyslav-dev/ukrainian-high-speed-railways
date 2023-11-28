"use client"

import React, { useMemo } from 'react'
import GooglePayButton from '@google-pay/button-react'
import { useRouter } from 'next/navigation'
import { buyTicketsRequest } from '@/api/tickets'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import SomethingWentWrong from '@/components/SomethingWentWrong'
import Button from '@/components/Button'

export default function Payment() {
  const { buyTicketPayload, selectedSeats } = useWorkflowStore()
  const router = useRouter()

  const totalPrice = useMemo(() => {
    const price = selectedSeats.reduce((acc, seat) => {
      return acc + seat.wagonPrice
    }, 0)

    return price.toFixed(2)
  }, [selectedSeats])

  const savePhoneToLocalStorage = (phone: string): void => {
    const phones = JSON.parse(localStorage.getItem('UHR/PHONES') || '[]')

    if (!phones.includes(phone)) {
      phones.push(phone)
    }

    localStorage.setItem('UHR/PHONES', JSON.stringify(phones))
  }

  const buyTickets = async () => {
    const response = await buyTicketsRequest(buyTicketPayload)

    if (response) {
      savePhoneToLocalStorage(response[0].phone)

      router.push("/workflow/success")
    }
  }

  const onBackClick = () => {
    router.back()
  }

  if (buyTicketPayload.length === 0) {
    return <SomethingWentWrong />
  } else {
    return (
      <React.Fragment>
        <div className='p-4 h-full'>
          <h1 className='text-2xl'>Payment</h1>
          <div className='h-3/4 flex flex-col justify-center items-center'>
            <div className='text-2xl font-semibold mb-4'>{Number(totalPrice).toFixed()} USD</div>
            <GooglePayButton
              environment="TEST"
              paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                  {
                    type: 'CARD',
                    parameters: {
                      allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                      allowedCardNetworks: ['MASTERCARD', 'VISA'],
                    },
                    tokenizationSpecification: {
                      type: 'PAYMENT_GATEWAY',
                      parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleGatewayMerchantId',
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: `${process.env.GOOGLE_ID}`,
                  merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPriceLabel: 'Total',
                  currencyCode: 'USD',
                  countryCode: 'US',
                  totalPrice,
                },
              }}
              onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest)

                buyTickets()
              }}
            />
          </div>
        </div>
        <div className='h-[90px] p-4 flex justify-end items-center border-t-2 border-primary'>
          <Button label='Back' onClick={onBackClick} size='medium' variant='outlined' />
        </div>
      </React.Fragment>
    )
  }
}
