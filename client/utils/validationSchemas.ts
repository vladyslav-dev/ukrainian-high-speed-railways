import * as yup from 'yup'
import { phoneRegExp } from './rejex'

export const searchTicketsSchema = yup.object().shape({
    originCity: yup.string().required('Origin city is a required field'),
    destinationCity: yup.string().required('Destination city is a required field'),
    departureDate: yup.date().required('Departure Date is a required field').min(new Date(), 'Please choose future date'), 
    arrivalDate: yup.date().nullable()
})

export const passengerSchema = yup.object().shape({
    firstName: yup.string().required('First Name is a required field'),
    lastName: yup.string().required('Last Name is a required field'),
    email: yup.string().email().required(),
    password: yup.string().matches(phoneRegExp, 'Phone number is not valid')
})