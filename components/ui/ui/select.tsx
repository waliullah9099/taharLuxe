"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

function useSelect() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error("useSelect must be used within a SelectProvider")
  }
  return context
}

interface SelectProps {
  children: React.ReactNode
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function Select({ children, value, defaultValue, onValueChange }: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue || "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setSelectedValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <SelectContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange, open, setOpen }}>
      {children}
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  className?: string
  placeholder?: string
}

export function SelectTrigger({ children, className, placeholder, ...props }: SelectTriggerProps) {
  const { value, open, setOpen } = useSelect()

  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50",
        className,
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <span className="flex-1 text-left truncate">{value || placeholder || "Select option"}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("h-4 w-4 transition-transform", open ? "rotate-180" : "")}
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  )
}

interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export function SelectContent({ children, className, ...props }: SelectContentProps) {
  const { open, setOpen } = useSelect()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80 dark:border-gray-800 dark:bg-gray-950",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  value: string
}

export function SelectItem({ children, value, className, ...props }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setOpen } = useSelect()

  const handleClick = () => {
    onValueChange(value)
    setOpen(false)
  }

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
        selectedValue === value && "bg-gray-100 dark:bg-gray-800",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      {selectedValue === value && (
        <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      )}
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useSelect()
  return <span>{value || placeholder}</span>
}
