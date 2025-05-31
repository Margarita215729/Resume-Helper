'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface BooleanInputProps {
  question: ProfileQuestion;
  value: boolean;
  onChange: (value: boolean) => void;
  profileData: ProfileData;
}

export const BooleanInput: React.FC<BooleanInputProps> = ({
  question,
  value,
  onChange
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        <input
          type="checkbox"
          id={question.id}
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="flex-1">
          <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 cursor-pointer">
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {question.helpText && (
            <p className="text-sm text-gray-500 mt-1">{question.helpText}</p>
          )}
        </div>
      </div>
    </div>
  );
};
