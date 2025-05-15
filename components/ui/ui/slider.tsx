"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { useEffect, useRef, useState } from "react"

interface SliderProps {
  defaultValue?: number[]
  value?: number[]
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number[]) => void
  className?: string
}

export function Slider({
  defaultValue = [0],
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
}: SliderProps) {
  const [values, setValues] = useState(value || defaultValue)
  const trackRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef<number | null>(null)

  useEffect(() => {
    if (value !== undefined) {
      setValues(value)
    }
  }, [value])

  const handleValueChange = (newValues: number[]) => {
    if (value === undefined) {
      setValues(newValues)
    }
    onValueChange?.(newValues)
  }

  const getPercentage = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  const getValueFromPosition = (position: number) => {
    const trackRect = trackRef.current?.getBoundingClientRect()
    if (!trackRect) return min

    const percentage = (position - trackRect.left) / trackRect.width
    const rawValue = percentage * (max - min) + min
    const steppedValue = Math.round(rawValue / step) * step
    return Math.max(min, Math.min(max, steppedValue))
  }

  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = index
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging.current === null) return

    const newValue = getValueFromPosition(e.clientX)
    const newValues = [...values]
    newValues[isDragging.current] = newValue

    // Ensure values are in ascending order for range sliders
    if (newValues.length > 1) {
      if (isDragging.current === 0 && newValue > newValues[1]) {
        newValues[isDragging.current] = newValues[1]
      } else if (isDragging.current === 1 && newValue < newValues[0]) {
        newValues[isDragging.current] = newValues[0]
      }
    }

    handleValueChange(newValues)
  }

  const handleMouseUp = () => {
    isDragging.current = null
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  return (
    <div className={cn("relative w-full touch-none select-none pt-5 pb-5", className)}>
      <div ref={trackRef} className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
        {values.length > 1 && (
          <div
            className="absolute h-full bg-blue-600 rounded-full"
            style={{
              left: `${getPercentage(values[0])}%`,
              width: `${getPercentage(values[1]) - getPercentage(values[0])}%`,
            }}
          />
        )}
        {values.map((value, index) => (
          <div
            key={index}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${getPercentage(value)}%` }}
          >
            <div
              className="h-4 w-4 rounded-full border-2 border-blue-600 bg-white dark:bg-gray-950 cursor-pointer"
              onMouseDown={handleMouseDown(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
