import React, { ButtonHTMLAttributes, useMemo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'outlined';
}

export default function Button(props: ButtonProps) {
    const { label, className, size = 'medium', variant = 'default', disabled = false } = props

    const sizeClass = useMemo(() => {
        const sizeClassMap = {
            small: 'min-w-[64px] h-[26px] text-xs',
            medium: 'min-w-[96px] h-[40px] text-sm',
            large: 'min-w-[160px] h-[48px] text-base',
        }

        return sizeClassMap[size]
    }, [size])

    const disabledClass = useMemo<string>(() => {
        return disabled ? 'opacity-60 hover:opacity-60 cursor-not-allowed' : ''
    }, [])

    const variantClass = useMemo(() => {
        const variantClassMap = {
            default: 'bg-primary text-white',
            outlined: 'bg-transparent border border-primary text-primary',
        }

        return variantClassMap[variant]
    }, [variant])

    return (
        <button
            {...props}
            className={`${sizeClass} font-medium flex-shrink-0 rounded-[6px] transition-all hover:opacity-90 px-3 focus:outline-none ${variantClass} ${disabledClass} ${className}`}
        >
            {label}
        </button>
    );
};