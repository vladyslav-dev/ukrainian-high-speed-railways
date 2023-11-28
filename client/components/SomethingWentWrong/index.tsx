import { Lexend_Giga } from 'next/font/google'
import Button from '@/components/Button'
import Image from 'next/image'
import Link from 'next/link'

const lexendGigaFont = Lexend_Giga({ subsets: ['latin'] })

const SomethingWentWrong = () => {

    return (
        <div className='h-3/4 flex flex-col gap-5 justify-center items-center'>
            <Image priority src={"/went-wrong.svg"} alt="Went wrong" width={695} height={252}/>
            <h1 className={lexendGigaFont.className}>Something went wrong, try to find the trip again!</h1>
            <Link href={"/"}>
                <Button label='Go Home'/>
            </Link>
        </div>
    )
}

export default SomethingWentWrong