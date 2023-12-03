"use client"

import Image from 'next/image'
import React, { useEffect } from 'react'
import Button from '@/components/Button'
import Link from 'next/link'
import { useWorkflowStore } from '@/stores/useWorkflowStore'
import { useRouter } from 'next/navigation'

export default function Success() {
  const { buyTicketPayload, setSelectedSeats } = useWorkflowStore()
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/')
    setSelectedSeats([])
    if (buyTicketPayload.length === 0) {
      router.push('/')
    }
  }, [])

  if (buyTicketPayload.length === 0) {
    return null
  } else {
    return (
      <div className='h-full'>
        <h1 className='text-2xl p-4'>Success</h1>
        <div className='h-[calc(75%-64px)] flex flex-col gap-5 justify-center items-center'>
          <Image priority width={705} height={238} src={"/success.svg"} alt="Success"/>
          <Link href="/tickets" className="text-white text-sm inline-block mr-8">
            <Button label='Show ticket(s)' />
          </Link>
        </div>
      </div>
    )
  }
}
