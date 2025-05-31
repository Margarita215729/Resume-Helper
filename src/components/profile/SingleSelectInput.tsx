'use client';

import React, { useState } from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface SingleSelectInputProps {
  question: ProfileQuestion;
  value: string;
  onChange: (value: string) => void;
  profileData: ProfileData;
}

export const SingleSelectInput: React.FC<SingleSelectInputProps> = ({
  question,
  value,
  onChange
}) => {
  const [customValue, setCustomValue] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'other' && question.allowOther) {
      setShowCustomInput(true);
      onChange('');
    } else {
      setShowCustomInput(false);
      onChange(selectedValue);
    }
  };

  const handleCustomChange = (customVal: string) => {
    setCustomValue(customVal);
    onChange(customVal);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {question.helpText && (
        <p className="text-sm text-gray-500">{question.helpText}</p>
      )}
      
      <select
        value={showCustomInput ? 'other' : value || ''}
        onChange={(e) => handleSelectChange(e.target.value)}
        required={question.required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select an option...</option>
        {question.options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
        {question.allowOther && (
          <option value="other">Other (please specify)</option>
        )}
      </select>

      {showCustomInput && question.allowOther && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => handleCustomChange(e.target.value)}
          placeholder="Please specify..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      )}
    </div>
  );
};
