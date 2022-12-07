/* eslint-disable react/require-default-props */
import React from 'react'

export const Loading = ({
  size,
  className,
}: {
  size?: string | number
  className?: string
}) => {
  return (
    <div
      className={`animate-spin text-white h-${size ?? 10} w-${size ??
        10} border-t-4 border-b-4 border-purple-500 ${className}`}
    ></div>
  )
}
