import { useState } from 'react';

export default function Form({ onSubmit }) {
  const [input, setInput] = useState('{"data":["M","1","334","4","B"]}');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError('Invalid input format. Expected {"data": [...]}');
        return;
      }
      onSubmit(parsedInput);
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          API Input
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-md min-h-[60px]"
        />
      </div>
      {error && (
        <div className="text-red-500 text-sm mb-2">{error}</div>
      )}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}