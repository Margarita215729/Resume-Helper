"use client";

import { useState, useEffect } from 'react';
import { Keyboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsProps {
  onSectionChange: (sectionId: string) => void;
  onSave: () => void;
  onExport: () => void;
}

export const KeyboardShortcuts = ({ onSectionChange, onSave, onExport }: KeyboardShortcutsProps) => {
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 's':
            event.preventDefault();
            onSave();
            break;
          case 'e':
            event.preventDefault();
            onExport();
            break;
          case '?':
            event.preventDefault();
            setShowHelp(!showHelp);
            break;
        }
      }

      // Section navigation
      if (event.altKey) {
        switch (event.key) {
          case '1':
            event.preventDefault();
            onSectionChange('personal');
            break;
          case '2':
            event.preventDefault();
            onSectionChange('summary');
            break;
          case '3':
            event.preventDefault();
            onSectionChange('experience');
            break;
          case '4':
            event.preventDefault();
            onSectionChange('education');
            break;
          case '5':
            event.preventDefault();
            onSectionChange('skills');
            break;
          case '6':
            event.preventDefault();
            onSectionChange('projects');
            break;
        }
      }

      // Toggle help with ?
      if (event.key === '?' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        setShowHelp(!showHelp);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onSectionChange, onSave, onExport, showHelp]);

  if (!showHelp) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <Keyboard className="h-4 w-4 mr-2" />
        Shortcuts (?)
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            Keyboard Shortcuts
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHelp(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Navigation</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Personal Info</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 1</kbd>
              </div>
              <div className="flex justify-between">
                <span>Summary</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 2</kbd>
              </div>
              <div className="flex justify-between">
                <span>Experience</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 3</kbd>
              </div>
              <div className="flex justify-between">
                <span>Education</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 4</kbd>
              </div>
              <div className="flex justify-between">
                <span>Skills</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 5</kbd>
              </div>
              <div className="flex justify-between">
                <span>Projects</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Alt + 6</kbd>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm text-gray-700 mb-2">Actions</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Save Resume</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + S</kbd>
              </div>
              <div className="flex justify-between">
                <span>Export Resume</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl + E</kbd>
              </div>
              <div className="flex justify-between">
                <span>Show/Hide Shortcuts</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">?</kbd>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">?</kbd> at any time to toggle this help.
          </p>
        </div>
      </div>
    </div>
  );
};
