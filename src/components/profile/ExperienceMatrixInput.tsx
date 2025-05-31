'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface ExperienceMatrixInputProps {
  question: ProfileQuestion;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  profileData: ProfileData;
}

export const ExperienceMatrixInput: React.FC<ExperienceMatrixInputProps> = ({
  question,
  value = {},
  onChange
}) => {
  const { matrix } = question;
  
  if (!matrix) {
    return <div className="text-red-500">Matrix configuration is missing</div>;
  }

  const handleExperienceChange = (item: string, level: number) => {
    onChange({
      ...value,
      [item]: level
    });
  };

  const { min, max, labels } = matrix.scale;

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

      {/* Scale Legend */}
      <div className="bg-gray-50 p-3 rounded-md">
        <p className="text-sm font-medium text-gray-700 mb-2">Experience Levels:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {labels?.map((label, index) => (
            <span key={index} className="text-xs text-gray-600 p-2 bg-white rounded border">
              <strong>{index + min}:</strong> {label}
            </span>
          ))}
        </div>
      </div>

      {/* Experience Matrix */}
      <div className="space-y-3">
        {matrix.items.map((item) => (
          <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-700 flex-1 pr-4">
              {item}
            </span>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: max - min + 1 }, (_, index) => {
                const level = min + index;
                const isSelected = value[item] === level;
                
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleExperienceChange(item, level)}
                    className={`w-10 h-10 rounded-md border-2 text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-green-600 border-green-600 text-white scale-105'
                        : 'border-gray-300 text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={labels?.[index] || `Level ${level}`}
                  >
                    {level}
                  </button>
                );
              })}
              
              {value[item] !== undefined && (
                <button
                  type="button"
                  onClick={() => {
                    const newValue = { ...value };
                    delete newValue[item];
                    onChange(newValue);
                  }}
                  className="ml-3 w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                  title="Clear experience level"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-500">
          {Object.keys(value).length} of {matrix.items.length} areas rated
        </span>
        {Object.keys(value).length > 0 && (
          <button
            type="button"
            onClick={() => onChange({})}
            className="text-red-600 hover:text-red-800 underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};
