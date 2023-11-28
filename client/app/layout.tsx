import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './tailwind.css'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import './dateRangePicker.css'
import HeroImage from '@/components/HeroImage'
import Header from '@/widgets/Header'

const interFont = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ukrainian High-Speed Railways',
  description: 'Explore the efficiency and speed of Ukrainian high-speed railways with our web application. Get up-to-date information on schedules, routes, ticket bookings, and more, making your journey through Ukraine a breeze. Experience modern transportation at its best.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={interFont.className}>
        <HeroImage />
        <div className='max-w-screen-xl h-screen flex flex-col mx-auto px-5 font-medium'>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
