"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import type { Project } from '@/types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export const ProjectsForm = ({ projects, onChange }: ProjectsFormProps) => {
  const addProject = () => {
    const newProject: Project = {
      name: '',
      description: '',
      technologies: [],
      url: ''
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...projects];
    if (field === 'technologies') {
      updated[index][field] = value as string[];
    } else {
      updated[index][field] = value as string;
    }
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const addTechnology = (projectIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].technologies.push('');
    onChange(updated);
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    const updated = [...projects];
    updated[projectIndex].technologies[techIndex] = value;
    onChange(updated);
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updated = [...projects];
    updated[projectIndex].technologies.splice(techIndex, 1);
    onChange(updated);
  };

  const handleTechnologiesChange = (projectIndex: number, value: string) => {
    // Split by comma and clean up
    const techs = value.split(',').map(tech => tech.trim()).filter(tech => tech.length > 0);
    updateProject(projectIndex, 'technologies', techs);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Projects</h3>
        <Button onClick={addProject} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Project {index + 1}</h4>
            <Button
              onClick={() => removeProject(index)}
              variant="ghost"
              size="sm"
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Name *</label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                placeholder="e.g., E-commerce Website"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project URL</label>
              <Input
                type="url"
                value={project.url || ''}
                onChange={(e) => updateProject(index, 'url', e.target.value)}
                placeholder="e.g., https://github.com/user/project"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description *</label>
            <Textarea
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              placeholder="Describe the project, your role, and key accomplishments..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Technologies Used</label>
            <Input
              value={project.technologies.join(', ')}
              onChange={(e) => handleTechnologiesChange(index, e.target.value)}
              placeholder="e.g., React, Node.js, MongoDB, AWS (separate with commas)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate technologies with commas
            </p>
          </div>
        </div>
      ))}

      {projects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No projects added yet.</p>
          <p className="text-sm">Click &quot;Add Project&quot; to showcase your work.</p>
        </div>
      )}
    </div>
  );
};
