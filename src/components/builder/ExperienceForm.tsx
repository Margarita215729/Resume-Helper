"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { Experience } from '@/types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export const ExperienceForm = ({ experiences, onChange }: ExperienceFormProps) => {
  const addExperience = () => {
    const newExperience: Experience = {
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      achievements: []
    };
    onChange([...experiences, newExperience]);
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    const updated = [...experiences];
    if (field === 'achievements') {
      updated[index][field] = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    onChange(updated);
  };

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const addAchievement = (expIndex: number) => {
    const updated = [...experiences];
    if (!updated[expIndex].achievements) {
      updated[expIndex].achievements = [];
    }
    updated[expIndex].achievements!.push('');
    onChange(updated);
  };

  const updateAchievement = (expIndex: number, achievementIndex: number, value: string) => {
    const updated = [...experiences];
    if (updated[expIndex].achievements) {
      updated[expIndex].achievements[achievementIndex] = value;
      onChange(updated);
    }
  };

  const removeAchievement = (expIndex: number, achievementIndex: number) => {
    const updated = [...experiences];
    if (updated[expIndex].achievements) {
      updated[expIndex].achievements.splice(achievementIndex, 1);
      onChange(updated);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Work Experience</h3>
        <Button onClick={addExperience} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {experiences.map((experience, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Experience {index + 1}</h4>
            <Button
              onClick={() => removeExperience(index)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job Title *</label>
              <Input
                value={experience.title}
                onChange={(e) => updateExperience(index, 'title', e.target.value)}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company *</label>
              <Input
                value={experience.company}
                onChange={(e) => updateExperience(index, 'company', e.target.value)}
                placeholder="e.g., Google"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <Input
                value={experience.location}
                onChange={(e) => updateExperience(index, 'location', e.target.value)}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date *</label>
              <Input
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <Input
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                placeholder="Leave empty if current"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Description *</label>
            <Textarea
              value={experience.description}
              onChange={(e) => updateExperience(index, 'description', e.target.value)}
              placeholder="Describe your role and responsibilities..."
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Key Achievements</label>
              <Button
                onClick={() => addAchievement(index)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Achievement
              </Button>
            </div>
            {experience.achievements?.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="flex items-center gap-2 mb-2">
                <Input
                  value={achievement}
                  onChange={(e) => updateAchievement(index, achievementIndex, e.target.value)}
                  placeholder="e.g., Increased team productivity by 30%"
                />
                <Button
                  onClick={() => removeAchievement(index, achievementIndex)}
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

      {experiences.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No work experience added yet.</p>
          <p className="text-sm">Click &quot;Add Experience&quot; to get started.</p>
        </div>
      )}
    </div>
  );
};
