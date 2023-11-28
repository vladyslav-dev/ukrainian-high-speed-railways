import Image from "next/image"

interface INotFoundProps {
    title: string
    description: string
}

const NotFound = (props: INotFoundProps) => {
    const { title, description } = props
    return (
        <div className="h-3/4 flex justify-center items-center">
            <Image priority width={512} height={512} src={"/not-found.svg"} alt="Not-found"/>
            <div className="max-w-[330px] w-full flex flex-col gap-5">
                <h1 className="text-2xl">{title}</h1>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    )
}

export default NotFound