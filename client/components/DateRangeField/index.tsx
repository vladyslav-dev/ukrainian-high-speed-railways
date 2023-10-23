'use client'

import { isValidDate } from '@/utils/common'
import { useMemo, useState } from 'react'
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
}

interface IRangeState extends Omit<Range, 'startDate' | 'endDate'> {
  startDate?: Date | null | undefined
  endDate?: Date | null | undefined
  [key: string]: any
}

export default function DateRangeField(props: IDateRangeFieldProps) {
  const { defautlStartDate, defaultEndDate, onStartDateChange, onEndDateChange, startDateLabel, endDateLabel } = props

  const [focusedInputs, setFocusedInputs] = useState<{ start: boolean, end: boolean }>({
    start: false,
    end: false,
  })

  const [ranges, setRanges] = useState<IRangeState[]>([{
    startDate: defautlStartDate,
    endDate: defaultEndDate,
    key: 'selection',
  }])

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

  const handleInputBlur = (inputType: 'start' | 'end') => {
    setFocusedInputs((prev) => ({
      ...prev,
      [inputType]: false,
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
    <div className="relative inline-block">
      <div className="relative inline-block">
        <input
          type="text"
          readOnly={true}
          value={startDateInputValue}
          className={`h-[48px] px-[12px] mr-1 outline-none`}
          onFocus={() => handleInputFocus('start')}
          onBlur={() => handleInputBlur('start')}
        />
        <div className={`transition-all absolute left-[12px] font-medium text-zinc-500 ${isStartDateLabelTop ? "top-[2px] text-[10px]" : "top-1/4"}`} >{startDateLabel}</div>
      </div>
      <div className="relative inline-block">
        <input
          type="text"
          readOnly={true}
          value={endDateInputValue}
          className={`h-[48px] px-[12px] outline-none`}
          onFocus={() => handleInputFocus('end')}
          onBlur={() => handleInputBlur('end')}
        />
        <div className={`transition-all absolute left-[12px] font-medium text-zinc-500 ${isEndDateLabelTop ? "top-[2px] text-[10px]" : "top-1/4"}`} >{endDateLabel}</div>
      </div>
      <DateRangePicker
        months={2}
        onChange={handleDatePickerChange}
        moveRangeOnFirstSelection={false}
        ranges={ranges as Range[]}
        showDateDisplay={false}
        showPreview={true}
        direction="horizontal"
        preventSnapRefocus={true}
      />
    </div>
  )
}