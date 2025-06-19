import React, { useState } from "react";

interface ListProps {
  options: number[];
  handleClick: (value: number) => void;
  label: string;
}

export const DropDownList: React.FC<ListProps> = ({ options, handleClick, label = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<number>()

  return (
    <div className="relative w-full">
      {/* Dropdown Trigger */}
      <div
        className="w-full p-2 border-2 border-gray-300 rounded-lg text-gray-700 cursor-pointer text-lg bg-white shadow-md hover:bg-gray-50 transition-colors flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected ? selected : label}</span>
        <span className="text-gray-400"></span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute w-full bg-white border-2 border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option}
              className="p-4 cursor-pointer hover:bg-red-100 transition-colors"
              onClick={() => {
                handleClick(option)
                setSelected(option)
                setIsOpen(false)
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
