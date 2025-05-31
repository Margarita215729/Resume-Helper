'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface ScaleInputProps {
  question: ProfileQuestion;
  value: number;
  onChange: (value: number) => void;
  profileData: ProfileData;
}

export const ScaleInput: React.FC<ScaleInputProps> = ({
  question,
  value,
  onChange
}) => {
  const { scale } = question;
  
  if (!scale) {
    return <div className="text-red-500">Scale configuration is missing</div>;
  }

  const { min, max, labels } = scale;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          {question.question}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {question.helpText && (
          <p className="text-sm text-gray-500 mt-1">{question.helpText}</p>
        )}
      </div>

      {/* Scale Options */}
      <div className="space-y-2">
        {Array.from({ length: max - min + 1 }, (_, index) => {
          const scaleValue = min + index;
          const isSelected = value === scaleValue;
          const label = labels?.[index] || `${scaleValue}`;
          
          return (
            <label
              key={scaleValue}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={scaleValue}
                checked={isSelected}
                onChange={() => onChange(scaleValue)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="ml-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{scaleValue}</span>
                  <span className="text-gray-600">-</span>
                  <span className="text-gray-700">{label}</span>
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Current Selection */}
      {value !== undefined && (
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {value} - {labels?.[value - min] || value}
          </p>
        </div>
      )}
    </div>
  );
};
