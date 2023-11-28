"use client"

import React, { useState } from 'react';
import ArrowIcon from '../Icons/Arrow';

export interface IAccordionProps {
    title: string;
    subTitle?: string;
    children: string | React.ReactNode;
    expanded?: boolean;
}

const Accordion = (props: IAccordionProps) => {
    const { title, subTitle, children, expanded = false } = props;

    const [isExpanded, setIsExpanded] = useState<boolean>(expanded);

    const toggleAccordion = () => setIsExpanded(!isExpanded);

    return (
        <React.Fragment>
            <div className="flex items-center justify-between rounded-md h-17 bg-backgroundLightGrey p-3 cursor-pointer" onClick={toggleAccordion}>
                <div className="flex flex-col">
                    <h6 className="text-base font-medium leading-6 mr-2.5">{title}</h6>
                    {subTitle && <div className="text-xs font-medium">{subTitle}</div>}
                </div>
                <ArrowIcon className={`min-w-3 min-h-3 transition-transform duration-400 ease-in-out transform ${isExpanded ? "rotate-0" : "rotate-180"}`} />
            </div>
            {isExpanded && <div className="text-xs font-semibold leading-6 pb-7">{children}</div>}
        </React.Fragment>
    )
}

export default Accordion;