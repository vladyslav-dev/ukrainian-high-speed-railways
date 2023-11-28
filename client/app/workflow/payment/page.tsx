"use client"
import React, { useEffect, useMemo } from 'react'
import GooglePayButton from '@google-pay/button-react'
import { useRouter } from 'next/navigation'
import { buyTicketsRequest } from '@/api/tickets'
import { useWorkflowStore } from '@/stores/useWorkflowStore'


export default function Payment() {
  const { buyTicketPayload, selectedSeats } = useWorkflowStore()
  const router = useRouter()

  useEffect(() => {
    if (!buyTicketPayload.length) {
      router.push('/')
    }
  }, [])

  const totalPrice = useMemo(() => {
    const price = selectedSeats.reduce((acc, seat) => {
      return acc + seat.wagonPrice
    }, 0)

    return price.toFixed(2)
  }, [selectedSeats])

  const buyTickets = async () => {
    const response = await buyTicketsRequest(buyTicketPayload)
    console.log('buyTickets', response)

    if (response) {
      router.push("/workflow/success")
    }
  }

  console.log('totalPrice', totalPrice)

  return (
    <div>
      <h1 className='text-2xl p-4'>Payment</h1>
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
  )
}
