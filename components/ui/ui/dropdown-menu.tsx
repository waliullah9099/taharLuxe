"use client"

import { cn } from "@/lib/utils"
import React, { createContext, useContext, useEffect, useRef, useState } from "react"

interface DropdownMenuContextType {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownMenuContext = createContext<DropdownMenuContextType | undefined>(undefined)

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)
  if (!context) {
    throw new Error("useDropdownMenu must be used within a DropdownMenuProvider")
  }
  return context
}

interface DropdownMenuProps {
  children: React.ReactNode
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)

  return <DropdownMenuContext.Provider value={{ open, setOpen }}>{children}</DropdownMenuContext.Provider>
}

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export function DropdownMenuTrigger({ children, asChild, ...props }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownMenu()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!open)
        if ((children as React.ReactElement).props.onClick) {
          ;(children as React.ReactElement).props.onClick(e)
        }
      },
      ...props,
    })
  }

  return (
    <button onClick={() => setOpen(!open)} {...props}>
      {children}
    </button>
  )
}

interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  align?: "start" | "end" | "center"
}

export function DropdownMenuContent({ children, align = "center", className, ...props }: DropdownMenuContentProps) {
  const { open, setOpen } = useDropdownMenu()
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

  const alignmentClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md animate-in fade-in-80 dark:border-gray-800 dark:bg-gray-950",
        alignmentClasses[align],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface DropdownMenuLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DropdownMenuLabel({ children, className, ...props }: DropdownMenuLabelProps) {
  return (
    <div className={cn("px-2 py-1.5 text-sm font-semibold", className)} {...props}>
      {children}
    </div>
  )
}

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export function DropdownMenuItem({ children, className, asChild, ...props }: DropdownMenuItemProps) {
  const { setOpen } = useDropdownMenu()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.onClick) props.onClick(e)
    setOpen(false)
  }

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      className: cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
        (children as React.ReactElement).props.className,
      ),
      onClick: (e: React.MouseEvent) => {
        handleClick(e as React.MouseEvent<HTMLButtonElement>)
        if ((children as React.ReactElement).props.onClick) {
          ;(children as React.ReactElement).props.onClick(e)
        }
      },
    })
  }

  return (
    <button
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-gray-200 dark:bg-gray-800", className)} {...props} />
}
