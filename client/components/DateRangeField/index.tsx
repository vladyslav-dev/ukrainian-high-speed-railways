'use client'

import { isValidDate } from '@/utils/common'
import { useMemo, useState, useRef, useEffect } from 'react'
import { DateRangePicker, Range } from 'react-date-range'

interface IDefaultDateRange {
  defautlStartDate: Date | null | undefined
  defaultEndDate: Date | null | undefined
}

interface IDateRangeFieldProps extends IDefaultDateRange {
  startDateLabel: string
  endDateLabel: string
  onStartDateChange: (date: Date | null | undefined) => void
  onEndDateChange: (date: Date | null | undefined) => void
  startDateInputClassName?: string
  endDateInputClassName?: string
  isStartDateValid?: boolean
  isEndDateValid?: boolean
}

interface IRangeState extends Omit<Range, 'startDate' | 'endDate'> {
  startDate?: Date | null | undefined
  endDate?: Date | null | undefined
  [key: string]: any
}

export default function DateRangeField(props: IDateRangeFieldProps) {
  const {
    defautlStartDate,
    defaultEndDate,
    onStartDateChange,
    onEndDateChange,
    startDateLabel,
    endDateLabel,
    startDateInputClassName,
    endDateInputClassName,
    isStartDateValid = true,
    isEndDateValid = true,
  } = props

  const [focusedInputs, setFocusedInputs] = useState<{ start: boolean, end: boolean }>({
    start: false,
    end: false,
  })

  const startDateContainerRef = useRef<HTMLInputElement | null>(null);
  const endDateContainerRef = useRef<HTMLInputElement | null>(null);
  const dateRangeContainerRef = useRef<HTMLDivElement | null>(null);

  const [ranges, setRanges] = useState<IRangeState[]>([{
    startDate: defautlStartDate,
    endDate: defaultEndDate,
    key: 'selection',
  }])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const isOutside = Boolean(
        !focusedInputs.start && !focusedInputs.end &&
        dateRangeContainerRef.current && !dateRangeContainerRef.current.contains(event.target) &&
        startDateContainerRef.current && !startDateContainerRef.current.contains(event.target) &&
        endDateContainerRef.current && !endDateContainerRef.current.contains(event.target)
      );

      if (isOutside) {
        setFocusedInputs({
          start: false,
          end: false,
        })
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleDatePickerChange = (item: IRangeState) => {
    const { startDate, endDate } = item.selection

    onStartDateChange(startDate)
    onEndDateChange(startDate === endDate ? null : endDate)

    setRanges([item.selection])
  }

  const handleInputFocus = (inputType: 'start' | 'end') => {
    setFocusedInputs((prev) => ({
      ...prev,
      [inputType]: true,
    }))
  }

  const { startDate, endDate } = ranges[0] || {}
  const startDateStr = startDate?.toLocaleDateString() || ''
  const endDateStr = endDate?.toLocaleDateString() || ''
  const startDateInputValue = startDate && isValidDate(startDate) ? startDateStr : ''
  const endDateInputValue = endDate && (startDate !== endDate) && isValidDate(endDate) ? endDateStr : ''
  const isStartDateLabelTop = useMemo(() => Boolean(focusedInputs.start || startDateInputValue), [
    focusedInputs.start,
    startDateInputValue,
  ])
  const isEndDateLabelTop = useMemo(() => Boolean(focusedInputs.end || endDateInputValue), [
    focusedInputs.end,
    endDateInputValue,
  ])

  return (
    <div className="relative flex items-center">
      <div className="relative inline-block mr-1" ref={startDateContainerRef}>
        <input
          type="text"
          readOnly={true}
          value={startDateInputValue}
          className={`h-[48px] px-[12px] outline-none w-full ${startDateInputClassName} ${isStartDateValid ? "" : "border-[2px] border-danger"}`}
          onFocus={() => handleInputFocus('start')}
        />
        <div className={`transition-all pointer-events-none absolute left-[12px] font-medium text-zinc-500 ${isStartDateLabelTop ? "top-[2px] text-[10px]" : "top-1/4"}`} >{startDateLabel}</div>
      </div>
      <div className="relative inline-block" ref={endDateContainerRef}>
        <input
          type="text"
          readOnly={true}
          value={endDateInputValue}
          className={`h-[48px] px-[12px] outline-none w-full ${endDateInputClassName}`}
          onFocus={() => handleInputFocus('end')}
        />
        <div className={`transition-all pointer-events-none absolute left-[12px] font-medium text-zinc-500 ${isEndDateLabelTop ? "top-[2px] text-[10px]" : "top-1/4"}`} >{endDateLabel}</div>
      </div>
      {(focusedInputs.start || focusedInputs.end) && (
        <div ref={dateRangeContainerRef} onClick={(e) => e.stopPropagation()} className="absolute top-[52px] left-0 bg-white shadow-lg rounded-lg animate-fade-in">
          <DateRangePicker
            months={2}
            color='#25B491'
            rangeColors={['#25B491']}
            onChange={handleDatePickerChange}
            moveRangeOnFirstSelection={false}
            ranges={ranges as Range[]}
            showDateDisplay={false}
            showPreview={true}
            direction="horizontal"
            preventSnapRefocus={true}
          />
        </div>
      )}
    </div>
  )
}