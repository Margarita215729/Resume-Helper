'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface TextInputProps {
  question: ProfileQuestion;
  value: string;
  onChange: (value: string) => void;
  profileData: ProfileData;
}

export const TextInput: React.FC<TextInputProps> = ({
  question,
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {question.question}
        {question.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {question.helpText && (
        <p className="text-sm text-gray-500">{question.helpText}</p>
      )}
      
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        required={question.required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};
