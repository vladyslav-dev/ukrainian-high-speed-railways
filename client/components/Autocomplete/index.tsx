import React, { useState, useEffect, useRef, useMemo, HTMLProps, ChangeEvent, KeyboardEvent, MouseEvent } from 'react'

interface IAutocompleteProps extends HTMLProps<HTMLInputElement> {
    label: string
    options: string[]
    isFetching?: boolean
    isValid?: boolean
    className?: string
    inputValue: string
    onInputChange: (value: string) => void
}

export default function Autocomplete(props: IAutocompleteProps) {
    const { label, options, isFetching = false, isValid = true, className, onInputChange, inputValue, ...restProps } = props

    const [filteredOptions, setFilteredOptions] = useState<string[]>([])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0)

    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const filteredOptions = options.filter((option: string) => {
            return option.toLowerCase().includes(inputValue?.toLowerCase())
        })
        setFilteredOptions(filteredOptions)
    }, [inputValue, options])

    const handleOptionSelect = (option: string) => {
        onInputChange(option)
        setShowDropdown(false)
    }

    const handleOptionMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()

        handleOptionSelect(event.currentTarget.dataset.value!)
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value)
        setShowDropdown(true)
    }

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && filteredOptions.length > 0) {
            handleOptionSelect(filteredOptions[activeOptionIndex])
        } else if (event.key === 'ArrowDown') {
            event.preventDefault()
            if (activeOptionIndex < filteredOptions.length - 1) {
              setActiveOptionIndex(activeOptionIndex + 1)
              scrollOptionIntoView(activeOptionIndex + 1)
            } else {
                setActiveOptionIndex(0)
                scrollOptionIntoView(0)
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault()
            if (activeOptionIndex > 0) {
              setActiveOptionIndex(activeOptionIndex - 1)
              scrollOptionIntoView(activeOptionIndex - 1)
            } else {
                const lastIndex = filteredOptions.length - 1
                setActiveOptionIndex(lastIndex)
                scrollOptionIntoView(lastIndex)
            }
        }
    }

    const scrollOptionIntoView = (index: number) => {
        if (containerRef.current) {
          const optionElement = containerRef.current.children[index] as HTMLDivElement;
          if (optionElement) {
            const container = containerRef.current;
            const optionTop = optionElement.offsetTop;
            const optionBottom = optionTop + optionElement.clientHeight;
            const containerTop = container.scrollTop;
            const containerBottom = containerTop + container.clientHeight;

            if (optionTop < containerTop) {
              container.scrollTop = optionTop;
            } else if (optionBottom > containerBottom) {
              container.scrollTop = optionBottom - container.clientHeight;
            }
          }
        }
      };

    const handleInputFocus = () => {
        setIsFocused(true)
    }

    const handleInputBlur = () => {
        // Delay closing the dropdown to allow clicking on an option
        setTimeout(() => {
            setShowDropdown(false)
            setIsFocused(false)

            if (filteredOptions.length === 0) {
                onInputChange('')
            }

        }, 100)
    }

    const isLabelTop = useMemo(() => Boolean(isFocused || inputValue), [isFocused, inputValue])

    return (
        <div className="relative inline-block">
            <input
                {...restProps}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                className={`h-[48px] px-[12px] pt-[6px] outline-none w-full ${className} ${isValid ? "" : "border-[2px] border-danger"}`}
            />

            {showDropdown && (
                <div
                    ref={containerRef}
                    className="absolute left-0 right-0 border border-gray-300 mt-1 bg-white rounded shadow-md max-h-[320px] overflow-auto z-10"
                >
                    {isFetching ? (
                        <div className="px-3 py-1">Loading...</div>
                    ) : filteredOptions.length > 0 ? filteredOptions.map((option, index) => (
                        <div
                            key={option}
                            data-value={option}
                            onMouseDown={handleOptionMouseDown}
                            className={`cursor-pointer hover:bg-gray-100 px-3 py-1 ${activeOptionIndex === index ? "bg-gray-100" : ""}`}
                        >
                            {option}
                        </div>
                    )) : (
                        <div className="px-3 py-1">No options</div>
                    )}
                </div>
            )}
            <div className={`transition-all pointer-events-none absolute left-[12px] font-medium text-zinc-500 ${isLabelTop ? "top-[2px] text-[10px]" : "top-1/4"}`} >{label}</div>
        </div>
    )
}