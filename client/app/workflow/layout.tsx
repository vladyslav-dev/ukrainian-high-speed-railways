import SearchTicketsForm from '@/widgets/SearchTicketsForm'
import React from 'react'

export default function WorkflowLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className='h-full flex flex-col overflow-hidden'>
        <SearchTicketsForm />
        <div className='w-full flex-1 flex flex-col bg-white rounded-tl-[6px] rounded-tr-[6px] mt-4 overflow-hidden'>
          {children}
        </div>
      </div>
    )
  }
