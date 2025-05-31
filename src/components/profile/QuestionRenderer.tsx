'use client';

import React from 'react';
import { ProfileQuestion, ProfileData } from '@/types/profile';
import { TextInput } from './TextInput';
import { TextareaInput } from './TextareaInput';
import { SingleSelectInput } from './SingleSelectInput';
import { MultiSelectInput } from './MultiSelectInput';
import { SkillMatrixInput } from './SkillMatrixInput';
import { ExperienceMatrixInput } from './ExperienceMatrixInput';
import { RangeInput } from './RangeInput';
import { BooleanInput } from './BooleanInput';
import { ScaleInput } from './ScaleInput';

interface QuestionRendererProps {
  question: ProfileQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
  profileData: ProfileData;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  value,
  onChange,
  profileData
}) => {
  const baseProps = {
    question,
    value,
    onChange,
    profileData
  };

  switch (question.type) {
    case 'text':
      return <TextInput {...baseProps} />;
    
    case 'textarea':
      return <TextareaInput {...baseProps} />;
    
    case 'single_select':
      return <SingleSelectInput {...baseProps} />;
    
    case 'multiselect':
      return <MultiSelectInput {...baseProps} />;
    
    case 'skill_matrix':
      return <SkillMatrixInput {...baseProps} />;
    
    case 'experience_matrix':
      return <ExperienceMatrixInput {...baseProps} />;
    
    case 'range':
      return <RangeInput {...baseProps} />;
    
    case 'boolean':
      return <BooleanInput {...baseProps} />;
    
    case 'scale':
      return <ScaleInput {...baseProps} />;
    
    default:
      return (
        <div className="text-red-500">
          Unsupported question type: {question.type}
        </div>
      );
  }
};
