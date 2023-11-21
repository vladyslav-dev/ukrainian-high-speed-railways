import CardItem, { ICardProps } from "./CardItem"

interface ICardListProps {
    data: ICardProps[]
}

const CardList = (props: ICardListProps) => {
    const { data } = props

    return (
        <div className="overflow-auto h-full p-4 flex flex-col gap-3 flex-1">
            {data.map((item, index) => <CardItem key={index} {...item} /> )}
        </div>
    )
}

export default CardList