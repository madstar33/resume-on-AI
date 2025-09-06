/*
 EN: File: ../../../../home/sandbox/
     This file is auto-annotated with bilingual (EN/FA) educational comments to help beginners.
 FA: فایل: ../../../../home/sandbox/
     این فایل با کامنت‌های آموزشی دو‌زبانه (انگلیسی/فارسی) برای آموزش بهتر افراد مبتدی حاشیه‌نویسی شده است.
*/
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import type { ReactNode } from "react";
// EN: Importing external package 'react' from node_modules.
// FA: ایمپورت پکیج خارجی 'react' از node_modules.
// npm install react   ← اگر نصب نبود
import React, { createContext, useContext, useState } from "react";
// EN: Importing external package '~/lib/utils' from node_modules.
// FA: ایمپورت پکیج خارجی '~/lib/utils' از node_modules.
// npm install ~/lib/utils   ← اگر نصب نبود
import { cn } from "~/lib/utils";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

/* EN: Props interface `AccordionProps` — documents what props this component expects.
   FA: اینترفیس پراپس `AccordionProps` — مشخص می‌کند این کامپوننت چه پراپس‌هایی می‌پذیرد. */
interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}

/* EN: React functional component `Accordion` declared with React.FC type.
   FA: کامپوننت تابعی ری‌اکت `Accordion` با نوع React.FC تعریف شده است. */
export const Accordion: React.FC<AccordionProps> = ({
      children,
      defaultOpen,
      allowMultiple = false,
      className = "",
  }) => {
    const [activeItems, setActiveItems] = useState<string[]>(
        defaultOpen ? [defaultOpen] : []
    );

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider
            value={{ activeItems, toggleItem, isItemActive }}
        >
            <div className={`space-y-2 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

/* EN: Props interface `AccordionItemProps` — documents what props this component expects.
   FA: اینترفیس پراپس `AccordionItemProps` — مشخص می‌کند این کامپوننت چه پراپس‌هایی می‌پذیرد. */
interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

/* EN: React functional component `AccordionItem` declared with React.FC type.
   FA: کامپوننت تابعی ری‌اکت `AccordionItem` با نوع React.FC تعریف شده است. */
export const AccordionItem: React.FC<AccordionItemProps> = ({
        id,
        children,
        className = "",
    }) => {
    return (
        <div className={`overflow-hidden border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

/* EN: Props interface `AccordionHeaderProps` — documents what props this component expects.
   FA: اینترفیس پراپس `AccordionHeaderProps` — مشخص می‌کند این کامپوننت چه پراپس‌هایی می‌پذیرد. */
interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

/* EN: React functional component `AccordionHeader` declared with React.FC type.
   FA: کامپوننت تابعی ری‌اکت `AccordionHeader` با نوع React.FC تعریف شده است. */
export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
        itemId,
        children,
       className = "",
        icon,
        iconPosition = "right",
    }) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <svg
            className={cn("w-5 h-5 transition-transform duration-200", {
                "rotate-180": isActive,
            })}
            fill="none"
            stroke="#98A2B3"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button
            onClick={handleClick}
            className={`
        w-full px-4 py-3 text-left
        focus:outline-none
        transition-colors duration-200 flex items-center justify-between cursor-pointer
        ${className}
      `}
        >
            <div className="flex items-center space-x-3">
                {iconPosition === "left" && (icon || defaultIcon)}
                <div className="flex-1">{children}</div>
            </div>
            {iconPosition === "right" && (icon || defaultIcon)}
        </button>
    );
};

/* EN: Props interface `AccordionContentProps` — documents what props this component expects.
   FA: اینترفیس پراپس `AccordionContentProps` — مشخص می‌کند این کامپوننت چه پراپس‌هایی می‌پذیرد. */
interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
    className?: string;
}

/* EN: React functional component `AccordionContent` declared with React.FC type.
   FA: کامپوننت تابعی ری‌اکت `AccordionContent` با نوع React.FC تعریف شده است. */
export const AccordionContent: React.FC<AccordionContentProps> = ({
      itemId,
      children,
      className = "",
    }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
        >
            <div className="px-4 py-3 ">{children}</div>
        </div>
    );
};