import { Lexend_Giga } from 'next/font/google'

const lexendGigaFont = Lexend_Giga({ subsets: ['latin'] })

export default function HeroText() {
    return (
      <div className={lexendGigaFont.className}>
        <div className="flex flex-col items-center">
          <h1 className="text-3xl text-white font-extrabold">BUY TICKETS IN 5 MINUTES</h1>
          <span className="text-center text-white text-lg font-medium tracking-tighter mt-4">Helping you save your time</span>
        </div>
      </div>
    )
}