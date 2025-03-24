import React from "react";

interface ListProps{
    options: string[];
    handleClick: (value:string)=>void;
}

export const List: React.FC<ListProps>  = ({options, handleClick}) =>{
    return (
        <div>
        <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
            {options.map((option) => (
                <li
                    key={option}
                    className="p-3 cursor-pointer hover:bg-red-100 transition"
                    onClick={() => handleClick(option)} 
                >
                    {option}
                </li>
            ))}
        </ul>   
            
        </div>
    )
}