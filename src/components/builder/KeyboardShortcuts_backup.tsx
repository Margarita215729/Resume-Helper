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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + S = Save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        onSave();
        return;
      }

      // Ctrl/Cmd + E = Export
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        onExport();
        return;
      }

      // Ctrl/Cmd + ? = Show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

      // Number keys 1-6 for section navigation
      if (e.altKey && /^[1-6]$/.test(e.key)) {
        e.preventDefault();
        const sectionMap: { [key: string]: string } = {
          '1': 'personal',
          '2': 'summary',
          '3': 'experience',
          '4': 'education',
          '5': 'skills',
          '6': 'projects'
        };
        onSectionChange(sectionMap[e.key]);
        return;
      }

      // Escape to close help
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onSectionChange, onSave, onExport]);

  const shortcuts = [
    { key: 'Ctrl/Cmd + S', description: 'Save resume' },
    { key: 'Ctrl/Cmd + E', description: 'Export resume' },
    { key: 'Alt + 1-6', description: 'Navigate between sections' },
    { key: 'Ctrl/Cmd + ?', description: 'Show this help' },
    { key: 'Escape', description: 'Close help dialog' }
  ];

  if (!showHelp) {
    return (
      <Button
        onClick={() => setShowHelp(true)}
        variant="ghost"
        size="sm"
        className="fixed bottom-4 right-4 z-50 bg-white shadow-lg border"
        title="Keyboard shortcuts (Ctrl/Cmd + ?)"
      >
        <Keyboard className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={() => setShowHelp(false)}
      />
      
      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </h3>
          <Button
            onClick={() => setShowHelp(false)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t text-center">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1 bg-gray-100 rounded">Escape</kbd> to close
          </p>
        </div>
      </div>
    </>
  );
};
