import { ICardProps } from "@/components/CardList/CardItem";

export const mockSearchResults: ICardProps[] = [
    {
        originCity: 'Kyiv',
        destinationCity: 'Lviv',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 100,
                availablePlaces: 10
            },
            {
                type: 'vip',
                price: 200,
                availablePlaces: 5
            }
        ]
    },
    {
        originCity: 'Kyiv',
        destinationCity: 'Odessa',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 120,
                availablePlaces: 8
            },
            {
                type: 'vip',
                price: 220,
                availablePlaces: 3
            }
        ]
    },
    {
        originCity: 'Lviv',
        destinationCity: 'Kyiv',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 90,
                availablePlaces: 12
            },
            {
                type: 'vip',
                price: 180,
                availablePlaces: 6
            }
        ]
    },
    {
        originCity: 'Odessa',
        destinationCity: 'Kharkiv',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 150,
                availablePlaces: 15
            },
            {
                type: 'vip',
                price: 250,
                availablePlaces: 7
            }
        ]
    },
    {
        originCity: 'Kharkiv',
        destinationCity: 'Dnipro',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 80,
                availablePlaces: 20
            },
            {
                type: 'vip',
                price: 180,
                availablePlaces: 10
            }
        ]
    },
    {
        originCity: 'Dnipro',
        destinationCity: 'Lviv',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 110,
                availablePlaces: 9
            },
            {
                type: 'vip',
                price: 210,
                availablePlaces: 4
            }
        ]
    },
    {
        originCity: 'Kharkiv',
        destinationCity: 'Kyiv',
        departureDate: new Date(),
        arrivalDate: new Date(),
        tickets: [
            {
                type: 'standart',
                price: 95,
                availablePlaces: 11
            },
            {
                type: 'vip',
                price: 195,
                availablePlaces: 5
            }
        ]
    }
]