"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

export const PersonalInfoForm = ({ personalInfo, onChange }: PersonalInfoFormProps) => {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <Input
            value={personalInfo.fullName}
            onChange={(e) => updateField('fullName', e.target.value)}
            placeholder="e.g., John Doe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email Address *</label>
          <Input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="e.g., john.doe@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number *</label>
          <Input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="e.g., (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location *</label>
          <Input
            value={personalInfo.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g., San Francisco, CA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
          <Input
            type="url"
            value={personalInfo.linkedin || ''}
            onChange={(e) => updateField('linkedin', e.target.value)}
            placeholder="e.g., https://linkedin.com/in/johndoe"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Portfolio/Website</label>
          <Input
            type="url"
            value={personalInfo.portfolio || ''}
            onChange={(e) => updateField('portfolio', e.target.value)}
            placeholder="e.g., https://johndoe.dev"
          />
        </div>
      </div>
    </div>
  );
};
