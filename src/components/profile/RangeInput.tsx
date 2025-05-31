'use client';

import React, { useState, useEffect } from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface RangeInputProps {
  question: ProfileQuestion;
  value: { min?: number; max?: number };
  onChange: (value: { min?: number; max?: number }) => void;
  profileData: ProfileData;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  question,
  value = {},
  onChange
}) => {
  const { scale } = question;
  const [minValue, setMinValue] = useState(value.min?.toString() || '');
  const [maxValue, setMaxValue] = useState(value.max?.toString() || '');

  useEffect(() => {
    setMinValue(value.min?.toString() || '');
    setMaxValue(value.max?.toString() || '');
  }, [value]);

  if (!scale) {
    return <div className="text-red-500">Scale configuration is missing</div>;
  }

  const handleMinChange = (newMin: string) => {
    setMinValue(newMin);
    const numMin = newMin ? parseInt(newMin) : undefined;
    onChange({
      ...value,
      min: numMin
    });
  };

  const handleMaxChange = (newMax: string) => {
    setMaxValue(newMax);
    const numMax = newMax ? parseInt(newMax) : undefined;
    onChange({
      ...value,
      max: numMax
    });
  };

  const formatNumber = (num: number) => {
    if (question.id === 'salary_expectation') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(num);
    }
    return num.toLocaleString();
  };

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

      <div className="space-y-3">
        {/* Range Display */}
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatNumber(scale.min)}</span>
            <span>{formatNumber(scale.max)}</span>
          </div>
        </div>

        {/* Min/Max Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Minimum
            </label>
            <input
              type="number"
              value={minValue}
              onChange={(e) => handleMinChange(e.target.value)}
              min={scale.min}
              max={scale.max}
              step={scale.step || 1}
              placeholder={scale.min.toString()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Maximum
            </label>
            <input
              type="number"
              value={maxValue}
              onChange={(e) => handleMaxChange(e.target.value)}
              min={scale.min}
              max={scale.max}
              step={scale.step || 1}
              placeholder={scale.max.toString()}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Current Range Display */}
        {(value.min !== undefined || value.max !== undefined) && (
          <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
            <strong>Selected Range:</strong>{' '}
            {value.min !== undefined ? formatNumber(value.min) : 'No minimum'} -{' '}
            {value.max !== undefined ? formatNumber(value.max) : 'No maximum'}
          </div>
        )}

        {/* Validation Messages */}
        {value.min !== undefined && value.max !== undefined && value.min > value.max && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            Minimum value cannot be greater than maximum value
          </div>
        )}
      </div>
    </div>
  );
};
