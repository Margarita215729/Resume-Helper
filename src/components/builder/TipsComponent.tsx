"use client";

import { useState } from 'react';
import { Lightbulb, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tip {
  id: string;
  title: string;
  content: string;
  section: string;
}

const TIPS: Tip[] = [
  {
    id: 'personal-info',
    section: 'personal',
    title: 'Professional Email',
    content: 'Use a professional email address like firstname.lastname@gmail.com instead of casual usernames.'
  },
  {
    id: 'summary-length',
    section: 'summary',
    title: 'Summary Length',
    content: 'Keep your professional summary between 2-4 sentences. Focus on your key achievements and career goals.'
  },
  {
    id: 'experience-achievements',
    section: 'experience',
    title: 'Quantify Achievements',
    content: 'Use numbers and percentages when possible. "Increased sales by 30%" is better than "Improved sales performance".'
  },
  {
    id: 'skills-relevance',
    section: 'skills',
    title: 'Relevant Skills',
    content: 'Tailor your skills to match the job description. Include both technical skills and soft skills that employers value.'
  },
  {
    id: 'education-recent',
    section: 'education',
    title: 'Education Order',
    content: 'List your education in reverse chronological order (most recent first). Include GPA if it\'s 3.5 or higher.'
  },
  {
    id: 'projects-impact',
    section: 'projects',
    title: 'Project Impact',
    content: 'Describe the problem solved, technologies used, and the impact or results achieved. Include live links if available.'
  }
];

interface TipsComponentProps {
  activeSection: string;
}

export const TipsComponent = ({ activeSection }: TipsComponentProps) => {
  const [dismissedTips, setDismissedTips] = useState<string[]>([]);
  
  const relevantTips = TIPS.filter(tip => 
    tip.section === activeSection && !dismissedTips.includes(tip.id)
  );

  const dismissTip = (tipId: string) => {
    setDismissedTips(prev => [...prev, tipId]);
  };

  if (relevantTips.length === 0) {
    return null;
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-amber-600" />
        <h3 className="text-sm font-medium text-amber-800">Pro Tips</h3>
      </div>
      
      <div className="space-y-3">
        {relevantTips.map((tip) => (
          <div key={tip.id} className="bg-white rounded-md p-3 border border-amber-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-1">{tip.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{tip.content}</p>
              </div>
              <Button
                onClick={() => dismissTip(tip.id)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-amber-200">
        <p className="text-xs text-amber-700">
          💡 These tips are tailored to help you create a stronger resume section.
        </p>
      </div>
    </div>
  );
};
