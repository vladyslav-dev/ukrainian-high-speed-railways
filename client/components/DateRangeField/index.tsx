'use client';

import { TDateRangeValue, UHRFormProps } from '@/types';
import { useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';



interface IDateRangeFieldProps extends UHRFormProps<TDateRangeValue> {
    
}


interface IRangeState extends Omit<Range, 'startDate' | 'endDate'> {
  startDate?: Date | null | undefined;
  endDate?: Date | null | undefined;
  [key: string]: any;
}

// function isValidDate(d: any): {
//   return d instanceof Date && !isNaN(+d) ? d : null;
// }

export default function DateRangeField(props: IDateRangeFieldProps) {
  const { setFormValueCallback } = props

  const [ranges, setRanges] = useState<IRangeState[]>([{
    startDate: null,
    endDate: new Date(""),
    key: 'selection',
  }]);

  console.log(ranges)

  const handleDatePickerChange = (item: IRangeState) => {
    setRanges([item.selection])

    setFormValueCallback({  })
  }

  return (
    <div className="relative inline-block">
       <input 
          type="text"
          value={ranges[0].startDate?.toLocaleDateString() || ''}
          className={`h-[48px] px-[12px] outline-none`}
        />
        <input 
          type="text"
          value={ranges[0].endDate?.toLocaleDateString() || ''}
          className={`h-[48px] px-[12px] outline-none`}
        />
          
      <DateRangePicker
        onChange={handleDatePickerChange}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={ranges as Range[]}
        showDateDisplay={false}
        showPreview={true}
        direction="horizontal"
        preventSnapRefocus={true}
      />
    </div>
  );
}