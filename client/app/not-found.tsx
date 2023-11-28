import Image from "next/image"
import Button from '@/components/Button'
import Link from "next/link"


function NotFoundPage() {
	return (
        <div className='h-full flex flex-col overflow-hidden'>
            <div className='w-full flex-1 flex flex-col bg-white rounded-tl-[6px] rounded-tr-[6px] mt-4 overflow-hidden'>
                <div className="h-3/4 flex flex-col justify-center items-center">
                    <Image priority width={433} height={433} src={"/404.svg"} alt="Page not found"/>
                    <Link href="/">
                        <Button label="Go Home"  />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage