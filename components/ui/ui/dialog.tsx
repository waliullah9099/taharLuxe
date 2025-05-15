"use client"

import { cn } from "@/lib/utils"
import React, { createContext, useContext, useEffect, useRef } from "react"

interface DialogContextType {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}

interface DialogProps {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function Dialog({ children, open, onOpenChange }: DialogProps) {
  return (
    <DialogContext.Provider value={{ open: open || false, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </DialogContext.Provider>
  )
}

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  asChild?: boolean
}

export function DialogTrigger({ children, asChild, ...props }: DialogTriggerProps) {
  const { onOpenChange } = useDialog()

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: (e: React.MouseEvent) => {
        e.preventDefault()
        onOpenChange(true)
        if ((children as React.ReactElement).props.onClick) {
          ;(children as React.ReactElement).props.onClick(e)
        }
      },
      ...props,
    })
  }

  return (
    <button onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  )
}

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function DialogContent({ children, className, ...props }: DialogContentProps) {
  const { open, onOpenChange } = useDialog()
  const ref = useRef<HTMLDivElement>(null)

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={ref}
        className={cn(
          "relative max-h-[90vh] w-full max-w-md overflow-auto rounded-lg bg-white p-6 shadow-lg animate-in fade-in-90 dark:bg-gray-950",
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

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DialogHeader({ children, className, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("mb-4 text-center sm:text-left", className)} {...props}>
      {children}
    </div>
  )
}

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

export function DialogTitle({ children, className, ...props }: DialogTitleProps) {
  return (
    <h3 className={cn("text-lg font-semibold", className)} {...props}>
      {children}
    </h3>
  )
}

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

export function DialogDescription({ children, className, ...props }: DialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-gray-500 dark:text-gray-400", className)} {...props}>
      {children}
    </p>
  )
}

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DialogFooter({ children, className, ...props }: DialogFooterProps) {
  return (
    <div className={cn("mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props}>
      {children}
    </div>
  )
}
