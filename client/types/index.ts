export enum SearchFormEnum {
    originCity = 'originCity',
    destinationCity = 'destinationCity',
    dateRange = 'dateRange',
}

export type TSearchFormKey = keyof typeof SearchFormEnum

export type UHRFormProps<V, T = {}> = Partial<T> & {
    formKey: TSearchFormKey
    setFormValueCallback: (value: V) => void
}
  
export type TOriginCity = { [SearchFormEnum.originCity] : string }
export type TDestinationCity = { [SearchFormEnum.destinationCity]: string }

export type TCityRange = TOriginCity & TDestinationCity

export type TDateRangeValue = {
    departureDate: Date
    arrivalDate: Date | null
}