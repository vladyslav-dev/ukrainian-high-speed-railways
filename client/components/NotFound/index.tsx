import Image from "next/image"

const NotFound = () => {
    return (
        <div className="h-3/4 flex justify-center items-center">
            <Image priority width={512} height={512} src={"/not-found.svg"} alt="Not-found"/>
            <div className="max-w-[330px] w-full flex flex-col gap-5">
                <h1 className="text-2xl">No Tickets Found</h1>
                <p className="text-sm">Sorry, no tickets found for your selected dates or cities. Please review your choices or contact our customer support for assistance.</p>
            </div>
        </div>
    )
}

export default NotFound