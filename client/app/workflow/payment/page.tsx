"use client"
import React from 'react'
import GooglePayButton from '@google-pay/button-react'
import { useRouter } from 'next/navigation'

export default function Payment() {
  const router = useRouter()

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
            totalPrice: '100.00', // <====== PRICE HERE
            currencyCode: 'USD',
            countryCode: 'US',
          },
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('load payment data', paymentRequest)
          router.push("/workflow/success")
        }}
      />
    </div>
  )
}
