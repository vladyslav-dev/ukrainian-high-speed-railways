import Button from "@/components/Button"
import ClockIcon from "@/components/Icons/Clock"
import TrainIcon from "@/components/Icons/Train"

type TTicketType = 'standart' | 'vip'

interface ITicket {
    type: TTicketType
    price: number,
    availablePlaces: number
}

export interface ICardProps {
    originCity: string
    destinationCity: string
    departureDate: Date
    arrivalDate: Date
    tickets: ITicket[]
}

const Ticket = (props: ITicket) => {
    const { type, price, availablePlaces } = props

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-backgroundLightGrey rounded-[4px]">
            <div className="flex items-center mr-3">
                <span>{type}&nbsp;</span>
                <span className="text-secondary text-sm">{availablePlaces} place(s)</span>
            </div>
            <Button label={`${price} USD`} size='medium' />
        </div>
    )
}

const CardItem = (props: ICardProps) => {
    const {
        originCity,
        destinationCity,
        departureDate,
        arrivalDate,
        tickets,
    } = props

    return (
        <div className="flex gap-6 justify-between bg-white rounded-[6px] p-4 whitespace-nowrap" style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}>
            <div className="flex flex-col justify-between gap-10 flex-1 min-w-[380px] max-w-[380px]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-lg font-medium">8:30 AM</div>
                        <div className="text-xs text-secondary">Th, 24 March</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[42px] h-[1px] bg-primary" />
                        <div className="flex items-center mx-2">
                            <ClockIcon />
                            <span className="text-primary ml-2">4:30</span>
                        </div>
                        <div className="w-[42px] h-[1px] bg-primary" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">1:00 PM</div>
                        <div className="text-xs text-secondary">Fr, 25 March</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <TrainIcon />
                    <span className="text-primary ml-2">{originCity} - {destinationCity}</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-2 max-w-[320px]">
                {tickets.map((ticket, index) => <Ticket key={index} {...ticket} />)}
            </div>
        </div>
    )
}

export default CardItem