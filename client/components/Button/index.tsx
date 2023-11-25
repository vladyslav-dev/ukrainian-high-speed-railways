import React, { ButtonHTMLAttributes, useMemo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export default function Button(props: ButtonProps) {
    const { label, className, size = 'medium' } = props

    const sizeClass = useMemo(() => {
        const sizeClassMap = {
            small: 'w-26 h-[26px] text-xs',
            medium: 'w-24 h-[38px] text-sm',
            large: 'w-40 h-[48px] text-base',
        }

        return sizeClassMap[size]
    }, [size])

    return (
        <button
            {...props}
            className={`${sizeClass} font-medium flex-shrink-0 rounded-[6px] bg-primary text-white transition-all hover:opacity-90 focus:outline-none ${className}`}
        >
            {label}
        </button>
    );
};