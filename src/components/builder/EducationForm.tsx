"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import type { Education } from '@/types/resume';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export const EducationForm = ({ education, onChange }: EducationFormProps) => {
  const addEducation = () => {
    const newEducation: Education = {
      degree: '',
      fieldOfStudy: '',
      institution: '',
      graduationYear: '',
      gpa: '',
      honors: []
    };
    onChange([...education, newEducation]);
  };

  const updateEducation = (index: number, field: keyof Education, value: string | string[]) => {
    const updated = [...education];
    if (field === 'honors') {
      updated[index][field] = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    onChange(updated);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const addHonor = (eduIndex: number) => {
    const updated = [...education];
    if (!updated[eduIndex].honors) {
      updated[eduIndex].honors = [];
    }
    updated[eduIndex].honors!.push('');
    onChange(updated);
  };

  const updateHonor = (eduIndex: number, honorIndex: number, value: string) => {
    const updated = [...education];
    if (updated[eduIndex].honors) {
      updated[eduIndex].honors[honorIndex] = value;
      onChange(updated);
    }
  };

  const removeHonor = (eduIndex: number, honorIndex: number) => {
    const updated = [...education];
    if (updated[eduIndex].honors) {
      updated[eduIndex].honors.splice(honorIndex, 1);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Education</h3>
        <Button onClick={addEducation} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Education {index + 1}</h4>
            <Button
              onClick={() => removeEducation(index)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Degree *</label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="e.g., Bachelor of Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Field of Study</label>
              <Input
                value={edu.fieldOfStudy || ''}
                onChange={(e) => updateEducation(index, 'fieldOfStudy', e.target.value)}
                placeholder="e.g., Computer Science"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Institution *</label>
              <Input
                value={edu.institution}
                onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                placeholder="e.g., Stanford University"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Graduation Year *</label>
              <Input
                type="number"
                value={edu.graduationYear}
                onChange={(e) => updateEducation(index, 'graduationYear', e.target.value)}
                placeholder="e.g., 2024"
                min="1950"
                max="2030"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GPA (Optional)</label>
              <Input
                value={edu.gpa || ''}
                onChange={(e) => updateEducation(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Honors & Awards</label>
              <Button
                onClick={() => addHonor(index)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Honor
              </Button>
            </div>
            {edu.honors?.map((honor, honorIndex) => (
              <div key={honorIndex} className="flex items-center gap-2 mb-2">
                <Input
                  value={honor}
                  onChange={(e) => updateHonor(index, honorIndex, e.target.value)}
                  placeholder="e.g., Magna Cum Laude, Dean's List"
                />
                <Button
                  onClick={() => removeHonor(index, honorIndex)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No education added yet.</p>
          <p className="text-sm">Click &quot;Add Education&quot; to get started.</p>
        </div>
      )}
    </div>
  );
};
