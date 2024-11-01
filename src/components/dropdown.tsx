import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  placeholder?: string;
  onSelect: (selectedOption: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, placeholder, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left mr-5">
      <button
        type="button"
        className="bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={toggleDropdown}
      >
        {selectedOption || placeholder}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
