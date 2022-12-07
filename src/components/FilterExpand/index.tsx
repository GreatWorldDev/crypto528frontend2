/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React, { useContext, useState } from 'react'

interface PageProps {
  children: any
  title: string
  open?: boolean
}

export const FilterExpand = ({ title, children, open }: PageProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(open ?? false)

  return (
    <div className="border-t border-gray-500">
      <div
        className="flex justify-between items-center py-8 cursor-pointer text-white"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <p className="group-title">{title}</p>
        <img
          src="/images/arrowdown_yellow.png"
          alt=""
          className={`rotate-animation ${isOpen ? 'rotate' : ''}`}
        />
      </div>
      {isOpen && <div className="mb-8">{children}</div>}
    </div>
  )
}
