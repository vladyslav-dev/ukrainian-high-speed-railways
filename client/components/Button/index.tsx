import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

export default function Button(props: ButtonProps) {
    const { label, className } = props
    return (
        <button
            {...props}
            className={`w-40 h-[48px] flex-shrink-0 rounded-[6px] bg-primary text-white focus:outline-none ${className}`}
        >
            {label}
        </button>
    );
};