import type React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  children?: React.ReactNode
}

export function Button({ className, children, variant = "default", size = "default", ...props }: ButtonProps) {
  const variantStyles = {
    default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700",
    outline: "border border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
  }

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 py-1 text-sm",
    lg: "h-12 px-6 py-3 text-lg",
    icon: "h-10 w-10 p-0",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
