"use client"

import { cn } from "@/lib/utils"
import React, { createContext, useContext, useEffect, useState } from "react"

interface SheetContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = createContext<SheetContextType | undefined>(undefined)

function useSheet() {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error("useSheet must be used within a SheetProvider")
  }
  return context
}

interface SheetProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Sheet({ children, open, onOpenChange }: SheetProps) {
  const [isOpen, setIsOpen] = useState(open || false)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (value: boolean) => {
    if (open === undefined) {
      setIsOpen(value)
    }
    onOpenChange?.(value)
  }

  return (
    <SheetContext.Provider
      value={{
        open: isOpen,
        onOpenChange: handleOpenChange,
      }}
    >
      {children}
    </SheetContext.Provider>
  )
}

interface SheetTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

export function SheetTrigger({ children, asChild }: SheetTriggerProps) {
  const { onOpenChange } = useSheet()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        onOpenChange(true)
        if ((children as React.ReactElement).props.onClick) {
          ;(children as React.ReactElement).props.onClick(e)
        }
      },
    })
  }

  return (
    <button type="button" onClick={() => onOpenChange(true)}>
      {children}
    </button>
  )
}

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  side?: "top" | "right" | "bottom" | "left"
}

export function SheetContent({ children, side = "right", className, ...props }: SheetContentProps) {
  const { open, onOpenChange } = useSheet()

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [open, onOpenChange])

  if (!open) return null

  const sideClasses = {
    top: "inset-x-0 top-0 border-b",
    right: "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l sm:max-w-sm",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r sm:max-w-sm",
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className={cn(
          "fixed bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 dark:bg-gray-950",
          sideClasses[side],
          className,
        )}
        {...props}
      >
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:pointer-events-none"
          onClick={() => onOpenChange(false)}
        >
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function SheetHeader({ children, className, ...props }: SheetHeaderProps) {
  return (
    <div className={cn("mb-6 space-y-2", className)} {...props}>
      {children}
    </div>
  )
}

interface SheetTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function SheetTitle({ children, className, ...props }: SheetTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

interface SheetDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function SheetDescription({ children, className, ...props }: SheetDescriptionProps) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props}>
      {children}
    </p>
  )
}
