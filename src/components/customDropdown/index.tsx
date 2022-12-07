/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react'
import './style.scss'

interface PageProps {
  selected: string
  className?: string
  lists: string[]
  handleSelect: (item: string) => void
}

export const CustomDropdown = ({
  selected,
  className,
  lists,
  handleSelect,
}: PageProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`relative inline-block w-full text-left flex-shrink-0 z-40 ${className}`}
    >
      {isOpen && (
        <div
          className="flex fixed inset-0 bg-red z-0"
          onClick={() => {
            setIsOpen(false)
          }}
        ></div>
      )}
      <button
        type="button"
        className="z-50 inline-flex flex items-center justify-between flex-shrink-0 focus:outline-none dropdown-selected"
        id="menu-button"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        {selected}
        <img
          src="/images/arrowdown_yellow.png"
          alt="arrow"
          className={`dropdown-arrow rotate-animation ${
            isOpen ? 'rotate' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="z-10 origin-topRight absolute right-0 mt-2 w-full min-w-max shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-menu"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {lists &&
              lists.map((list: string, index: number) => (
                <a
                  href="#"
                  className="font-dropdown block px-4 py-2"
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${index}`}
                  key={`menu-item-${index}`}
                  onClick={e => {
                    e.preventDefault()
                    handleSelect(list)
                    setIsOpen(false)
                  }}
                >
                  {list}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
