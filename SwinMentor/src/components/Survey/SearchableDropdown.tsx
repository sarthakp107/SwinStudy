import React, { useState, useEffect } from "react";

interface SearchableDropdownProps {
    options: { id: string; name: string }[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options, onChange, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() === "") {
            setIsOpen(false); 
        }
    }, [searchTerm]);

  
    const filteredOptions = searchTerm.trim()
        ? options.filter(option => option.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5)
        : options.slice(0, 5); 

    const handleSelect = (selectedName: string) => {
        onChange(selectedName); 
        setSearchTerm(selectedName);
        setIsOpen(false); 
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                placeholder={placeholder || "Search..."}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)} 
                className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500"
            />
            
            
            {isOpen && filteredOptions.length > 0 && (
                <ul className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                    {filteredOptions.map(option => (
                        <li
                            key={option.id}
                            onMouseDown={() => handleSelect(option.name)} 
                            className="p-3 cursor-pointer hover:bg-red-100 transition"
                        >
                            {option.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
