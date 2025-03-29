import React, { useState } from "react";

interface ListProps{
    options: number[];
    handleClick: (value:number)=>void;
    label: string;
}

export const DropDownList: React.FC<ListProps>  = ({options, handleClick, label=""}) =>{
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState<number>()
    return (
        <div className="w-full p-3 border rounded-lg cursor-pointer bg-gray-100" onClick={() => setIsOpen(!isOpen)}>
        {selected ? selected : label}
        {isOpen&&
        <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
            {options.map((option) => (
                <li
                    key={option}
                    className="p-3 cursor-pointer hover:bg-red-100 transition"
                    onClick={() => {handleClick(option), setSelected(option)}} 
                >
                    {option}
                </li>
            ))}
        </ul>
}   
        </div>
    )
}