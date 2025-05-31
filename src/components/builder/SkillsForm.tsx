"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import type { Skills } from '@/types/resume';

interface SkillsFormProps {
  skills: Skills;
  onChange: (skills: Skills) => void;
}

export const SkillsForm = ({ skills, onChange }: SkillsFormProps) => {
  const addSkill = (category: keyof Skills) => {
    const updated = { ...skills };
    if (!updated[category]) {
      updated[category] = [];
    }
    updated[category]!.push('');
    onChange(updated);
  };

  const updateSkill = (category: keyof Skills, index: number, value: string) => {
    const updated = { ...skills };
    if (updated[category]) {
      updated[category]![index] = value;
      onChange(updated);
    }
  };

  const removeSkill = (category: keyof Skills, index: number) => {
    const updated = { ...skills };
    if (updated[category]) {
      updated[category]!.splice(index, 1);
      onChange(updated);
    }
  };

  const skillCategories = [
    { key: 'technical' as keyof Skills, label: 'Technical Skills', placeholder: 'e.g., JavaScript, Python, React' },
    { key: 'soft' as keyof Skills, label: 'Soft Skills', placeholder: 'e.g., Leadership, Communication, Problem Solving' },
    { key: 'languages' as keyof Skills, label: 'Languages', placeholder: 'e.g., English (Native), Spanish (Fluent)' },
    { key: 'certifications' as keyof Skills, label: 'Certifications', placeholder: 'e.g., AWS Certified Developer, PMP' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Skills & Qualifications</h3>

      {skillCategories.map(({ key, label, placeholder }) => (
        <div key={key} className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">{label}</label>
            <Button
              onClick={() => addSkill(key)}
              variant="outline"
              size="sm"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add {label.split(' ')[0]}
            </Button>
          </div>

          <div className="space-y-2">
            {skills[key]?.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(key, index, e.target.value)}
                  placeholder={placeholder}
                />
                <Button
                  onClick={() => removeSkill(key, index)}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )) || []}

            {(!skills[key] || skills[key]!.length === 0) && (
              <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <p className="text-sm">No {label.toLowerCase()} added yet.</p>
                <p className="text-xs">Click &quot;Add {label.split(' ')[0]}&quot; to get started.</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
