import { useState } from 'react';

export default function MultiFilter({ onChange }) {
  const [selectedOptions, setSelectedOptions] = useState(['Numbers', 'Highest Alphabet']);

  const handleChange = (option) => {
    const newSelection = selectedOptions.includes(option)
      ? selectedOptions.filter(item => item !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelection);
    onChange(newSelection);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <label className="block text-sm font-medium mb-2">
        Multi Filter
      </label>
      <div className="relative">
        <div className="border rounded-md p-2 flex flex-wrap gap-2">
          {selectedOptions.map(option => (
            <span 
              key={option}
              className="bg-gray-100 px-2 py-1 rounded-md flex items-center"
            >
              {option}
              <button
                onClick={() => handleChange(option)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}