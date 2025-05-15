"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { createContext, useContext, useState } from "react"

interface TabsContextType {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("useTabs must be used within a TabsProvider")
  }
  return context
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  defaultValue: string
  value?: string
  onValueChange?: (value: string) => void
}

export function Tabs({ children, defaultValue, value, onValueChange, className, ...props }: TabsProps) {
  const [tabValue, setTabValue] = useState(value || defaultValue)

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setTabValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider
      value={{
        value: value !== undefined ? value : tabValue,
        onValueChange: handleValueChange,
      }}
    >
      <div className={cn("", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 dark:bg-gray-800",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  value: string
}

export function TabsTrigger({ children, value, className, ...props }: TabsTriggerProps) {
  const { value: selectedValue, onValueChange } = useTabs()
  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        isSelected
          ? "bg-white text-gray-900 shadow-sm dark:bg-gray-950 dark:text-gray-50"
          : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  value: string
}

export function TabsContent({ children, value, className, ...props }: TabsContentProps) {
  const { value: selectedValue } = useTabs()
  const isSelected = selectedValue === value

  if (!isSelected) return null

  return (
    <div
      className={cn(
        "mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
