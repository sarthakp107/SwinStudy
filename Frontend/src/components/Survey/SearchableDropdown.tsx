import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaSearch } from "react-icons/fa";

interface SearchableDropdownProps {
  options: string[];
  selectedOptions: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
}

export const SearchableDropdown: React.FC<SearchableDropdownProps> = ({options,selectedOptions,onSelect,placeholder = "Search..."}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  //Show Filtered List according to Search Query
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Function to Listen close dropdown list if clicked anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
  <>
    {/* // Main Div */}
    <div className="relative w-full" ref={dropdownRef}>
      {/* Div for Search Input Box */}
      <div className="relative">
        <input type="text" placeholder={placeholder} value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); if (!isOpen) setIsOpen(true); setHighlightedIndex(-1);}}
          onFocus={() => setIsOpen(true)}
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"/>
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        {searchTerm && (<button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600" onClick={() => setSearchTerm("")}/>)}
      </div>

      {/* Div For Options List */}
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute w-full bg-white border border-gray-200 shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto z-10 animate-fadeIn">
          {filteredOptions.slice(0, 8).map((option, index) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <li key={option} onClick={() => {onSelect(option); setSearchTerm(""); setIsOpen(false);}}
                className={`p-3 cursor-pointer border-b last:border-b-0 flex items-center justify-between transition-all ${index === highlightedIndex? "bg-red-50": isSelected? "bg-red-50": "hover:bg-gray-50"}`}>
                <span>{option}</span>
                {isSelected && (<FaCheck className="h-5 w-5 text-red-500" />)}
              </li>
            );
          })}
        </ul>
      )}
      
      {/* Div If No Results Found */}
      {isOpen && searchTerm && filteredOptions.length === 0 && (
        <div className="absolute w-full bg-white border border-gray-200 shadow-lg rounded-lg mt-1 p-4 text-center z-10 animate-fadeIn">
          <p className="text-gray-500">No results found for "<span className="font-medium">{searchTerm}</span>"</p>
        </div>
      )}
    </div>
  </>
  );
};