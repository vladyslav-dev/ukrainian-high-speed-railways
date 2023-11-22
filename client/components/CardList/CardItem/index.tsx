import Button from "@/components/Button"
import ClockIcon from "@/components/Icons/Clock"
import TrainIcon from "@/components/Icons/Train"
import { ISearchResultData } from "@/types/trips"

type TTicketType = 'standart' | 'vip'

interface ITicket {
    type: TTicketType
    price: number,
    availablePlaces: number
}

export interface ICardProps extends ISearchResultData {

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
        departure_date,
        arrival_date,
        railway,
        standart,
        vip,
        name
    } = props

    function formatDiffTime(time: string): string {
        const [hoursStr, minutesStr] = time.split(':');
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr || '0', 10);
      
        if (hours >= 24) {
          return `${hours} hours`;
        } else {
          if (minutes === 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
          } else {
            return `${hours}:${minutes}`;
          }
        }
    }

    function formatDate(date: Date): string {
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedDate = formatter.format(date);
      
        // Extracting and formatting individual components
        const [weekday, month, day] = formattedDate.split(' ');
        const abbreviatedWeekday = weekday.substring(0, 2); // Take the first two characters of the weekday
      
        return `${abbreviatedWeekday}, ${day} ${month}`;
    }

    function calculateHoursAndMinutesDifference(date1: Date, date2: Date): string {
        const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime())
        
        const totalMinutes = Math.floor(diffInMilliseconds / (1000 * 60))
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        
        return `${hours}:${minutes}`
    }

    const departureDate = new Date(departure_date)
    const arrivalDate = new Date(arrival_date)

    const departureTime = departureDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    const arrivalTime = arrivalDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const diffTime = formatDiffTime(calculateHoursAndMinutesDifference(arrivalDate, departureDate))

    return (
        <div className="flex gap-6 justify-between bg-white rounded-[6px] p-4 whitespace-nowrap" style={{ boxShadow: "0px 7px 29px 0px rgba(100, 100, 111, 0.20)" }}>
            <div className="flex flex-col justify-between gap-10 flex-1 min-w-[380px] max-w-[380px]">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <div className="text-lg font-medium">{departureTime}</div>
                        <div className="text-xs text-secondary">{formatDate(departureDate)}</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-[42px] h-[1px] bg-primary" />
                        <div className="flex items-center mx-2">
                            <ClockIcon />
                            <span className="text-primary ml-2">{diffTime}</span>
                        </div>
                        <div className="w-[42px] h-[1px] bg-primary" />
                    </div>
                    <div>
                        <div className="text-lg font-medium">{arrivalTime}</div>
                        <div className="text-xs text-secondary">{formatDate(arrivalDate)}</div>
                    </div>
                </div>
                <div className="flex items-center">
                    <TrainIcon />
                    <span className="text-primary ml-2">{name}</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-2 max-w-[320px]">
                {standart && <Ticket type='standart' price={standart.price} availablePlaces={standart.seats} />}
                {vip && <Ticket type='vip' price={vip.price} availablePlaces={vip.seats} />}
            </div>
        </div>
    )
}

export default CardItem