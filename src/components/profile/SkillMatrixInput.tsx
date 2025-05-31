'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';

interface SkillMatrixInputProps {
  question: ProfileQuestion;
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
  profileData: ProfileData;
}

export const SkillMatrixInput: React.FC<SkillMatrixInputProps> = ({
  question,
  value = {},
  onChange
}) => {
  const { matrix } = question;
  
  if (!matrix) {
    return <div className="text-red-500">Matrix configuration is missing</div>;
  }

  const handleSkillChange = (skill: string, rating: number) => {
    onChange({
      ...value,
      [skill]: rating
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
        <p className="text-sm font-medium text-gray-700 mb-2">Rating Scale:</p>
        <div className="flex flex-wrap gap-4">
          {labels?.map((label, index) => (
            <span key={index} className="text-xs text-gray-600">
              {index + min}: {label}
            </span>
          ))}
        </div>
      </div>

      {/* Skills Matrix */}
      <div className="space-y-3">
        {matrix.items.map((skill) => (
          <div key={skill} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
            <span className="text-sm font-medium text-gray-700 flex-1">
              {skill}
            </span>
            
            <div className="flex items-center space-x-2">
              {Array.from({ length: max - min + 1 }, (_, index) => {
                const rating = min + index;
                const isSelected = value[skill] === rating;
                
                return (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleSkillChange(skill, rating)}
                    className={`w-8 h-8 rounded-full border-2 text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-600'
                    }`}
                  >
                    {rating}
                  </button>
                );
              })}
              
              {value[skill] && (
                <button
                  type="button"
                  onClick={() => {
                    const newValue = { ...value };
                    delete newValue[skill];
                    onChange(newValue);
                  }}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  title="Clear rating"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="text-sm text-gray-500">
        {Object.keys(value).length} of {matrix.items.length} skills rated
      </div>
    </div>
  );
};
