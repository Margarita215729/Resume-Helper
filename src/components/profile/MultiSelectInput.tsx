'use client';

import React, { useState } from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface MultiSelectInputProps {
  question: ProfileQuestion;
  value: string[];
  onChange: (value: string[]) => void;
  profileData: ProfileData;
}

export const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  question,
  value = [],
  onChange
}) => {
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleOptionChange = (option: string, checked: boolean) => {
    if (option === 'other' && question.allowOther) {
      setShowCustomInput(checked);
      if (!checked) {
        // Remove any custom values when unchecking "Other"
        const filteredValues = value.filter(v => 
          question.options?.includes(v) || v === 'other'
        );
        onChange(filteredValues.filter(v => v !== 'other'));
      }
      return;
    }

    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(v => v !== option));
    }
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange([...value, customValue.trim()]);
      setCustomValue('');
    }
  };

  const handleCustomKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCustomSubmit();
    }
  };

  const removeCustomValue = (valueToRemove: string) => {
    onChange(value.filter(v => v !== valueToRemove));
  };

  const customValues = value.filter(v => !question.options?.includes(v));

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {question.helpText && (
        <p className="text-sm text-gray-500">{question.helpText}</p>
      )}
      
      <div className="space-y-2">
        {question.options?.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={(e) => handleOptionChange(option, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
        
        {question.allowOther && (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showCustomInput}
              onChange={(e) => setShowCustomInput(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Other</span>
          </label>
        )}
      </div>

      {showCustomInput && question.allowOther && (
        <div className="flex space-x-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            onKeyPress={handleCustomKeyPress}
            placeholder="Type your custom option..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleCustomSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      )}

      {customValues.length > 0 && (
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Custom options:</p>
          <div className="flex flex-wrap gap-2">
            {customValues.map((customVal) => (
              <span
                key={customVal}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {customVal}
                <button
                  type="button"
                  onClick={() => removeCustomValue(customVal)}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
