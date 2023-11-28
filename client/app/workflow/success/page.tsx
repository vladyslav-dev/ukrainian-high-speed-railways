import Image from 'next/image'
import React from 'react'
import Button from '@/components/Button'

export default function Success() {
  return (
    <div className='h-full'>
      <h1 className='text-2xl p-4'>Success</h1>
      <div className='h-[calc(75%-64px)] flex flex-col gap-5 justify-center items-center'>
        <Image priority width={705} height={238} src={"/success.jpg"} alt="Success"/>
        <Button label='Send ticket(s)' />
      </div>
    </div>
  )
}
