import { useEffect } from "react"
import CloseIcon from "../Icons/Close"

interface IToasterProps {
    showToaster: boolean
    onCloseClick: () => void
    message: string
    type: 'success' | 'error'
}

const Toaster = (props: IToasterProps) => {
    let { message, showToaster, onCloseClick, type = 'success' } = props

    useEffect(() => {
        const timeOut = setTimeout(() => {
            onCloseClick()
        }, 3000)

        return () => clearTimeout(timeOut)
    }, [showToaster])

    return (
        <div
            className={`flex items-center gap-[32px] fixed left-1/2 transform -translate-x-1/2 whitespace-nowrap ${type === 'success' ? "bg-primary" : 'bg-danger' } text-white text-sm px-4 py-4 rounded-md transition-all duration-300 ${
                showToaster ? 'bottom-12' : '-bottom-12 pointer-events-none'
            }`}
            style={{
                transitionProperty: 'bottom, opacity',
                bottom: showToaster ? '45px' : '0',
                opacity: showToaster ? '1' : '0',
            }}
        >
            <span>{message}</span>
            <CloseIcon onClick={onCloseClick} />
        </div>
    )
}

export default Toaster