import { useState, useEffect } from 'react';

export default function MultiFilter({ onChange, data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(['Numbers', 'Alphabets', 'Highest Alphabet']);

  const allOptions = [
    { label: 'Numbers', value: 'Numbers' },
    { label: 'Alphabets', value: 'Alphabets' },
    { label: 'Highest Alphabet', value: 'Highest Alphabet' }
  ];

  const handleOptionClick = (option) => {
    let newSelection;
    if (selectedOptions.includes(option)) {
      newSelection = selectedOptions.filter(item => item !== option);
    } else {
      newSelection = [...selectedOptions, option];
    }
    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <label className="block text-sm font-medium mb-2">
        Multi Filter
      </label>
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(', ')
            : 'Select options'}
          <span className="absolute right-4 top-3">▼</span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
            {allOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleOptionClick(option.value)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => {}}
                  className="mr-2"
                />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}