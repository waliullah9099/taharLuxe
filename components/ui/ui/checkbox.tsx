"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useState } from "react"

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id?: string
}

export function Checkbox({ className, id, ...props }: CheckboxProps) {
  const [checked, setChecked] = useState(props.defaultChecked || false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  return (
    <div className="relative flex items-center">
      <input
        type="checkbox"
        id={id}
        className="peer absolute h-4 w-4 cursor-pointer opacity-0"
        checked={props.checked !== undefined ? props.checked : checked}
        onChange={handleChange}
        {...props}
      />
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded border border-gray-300 text-white transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 dark:border-gray-600",
          className,
        )}
      >
        {(props.checked !== undefined ? props.checked : checked) && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </div>
    </div>
  )
}
