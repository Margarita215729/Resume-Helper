"use client";

import { useState } from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface ProgressStepProps {
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  hasError?: boolean;
  onClick: () => void;
}

const ProgressStep = ({ title, isCompleted, isActive, hasError, onClick }: ProgressStepProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
        isActive
          ? 'bg-blue-50 text-blue-700 border border-blue-200'
          : isCompleted
          ? 'bg-green-50 text-green-700 hover:bg-green-100'
          : hasError
          ? 'bg-red-50 text-red-700 hover:bg-red-100'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {isCompleted ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : hasError ? (
        <AlertCircle className="h-4 w-4 text-red-500" />
      ) : (
        <Circle className="h-4 w-4" />
      )}
      {title}
    </button>
  );
};

interface ProgressTrackerProps {
  sections: Array<{
    id: string;
    label: string;
    isCompleted: boolean;
    hasError: boolean;
  }>;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const ProgressTracker = ({ sections, activeSection, onSectionChange }: ProgressTrackerProps) => {
  const completedCount = sections.filter(s => s.isCompleted).length;
  const totalCount = sections.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-900">Progress</h3>
          <span className="text-sm text-gray-500">{completedCount}/{totalCount} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{progressPercentage}% complete</p>
      </div>
      
      <div className="space-y-1">
        {sections.map((section) => (
          <ProgressStep
            key={section.id}
            title={section.label}
            isCompleted={section.isCompleted}
            isActive={activeSection === section.id}
            hasError={section.hasError}
            onClick={() => onSectionChange(section.id)}
          />
        ))}
      </div>
    </div>
  );
};
