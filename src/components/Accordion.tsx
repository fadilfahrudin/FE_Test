import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, ReactNode } from "react";

interface AccordionProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    className?:string;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, icon, className }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleAccordion}
                className={className}
            >
                <span className="flex items-center gap-2 text-sm font-semibold text-darkGrey">{icon} {title}</span>
                <ChevronRightIcon className={`w-4 h-4 transition-all ease-in duration-300 ${isOpen ? "transform rotate-90" : ""}`} />
            </button>
            {isOpen && (
                <>
                    {children}
                </>
            )}
        </div>
    );
};

export default Accordion;
