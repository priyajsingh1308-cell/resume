import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import AIWritingAssistant from "../AIWritingAssistant";

interface ProjectsFormProps {
  data: any;
  onUpdate: (section: string, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  completedSteps?: Set<number>;
}

const ProjectsForm = ({ data, onUpdate, onNext, onPrevious }: ProjectsFormProps) => {
  const [projects, setProjects] = useState(data.projects || [
    {
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    }
  ]);

  useEffect(() => {
    onUpdate('projects', projects);
  }, [projects, onUpdate]);

  const addProject = () => {
    setProjects([...projects, {
      name: '',
      description: '',
      technologies: '',
      url: '',
      github: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_: any, i: number) => i !== index));
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updated = projects.map((project: any, i: number) => 
      i === index ? { ...project, [field]: value } : project
    );
    setProjects(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Prepare context for AI writing assistant
  const getAIContext = (project: any) => ({
    fullName: data?.personalInfo?.fullName,
    projectName: project.name,
    technologies: project.technologies,
    experience: data?.experience || [],
    skills: data?.skills || [],
    education: data?.education || []
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Showcase your projects to demonstrate your skills and experience. Perfect for portfolios!
        </p>
      </div>

      {projects.map((project: any, index: number) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Project {index + 1}
            </h3>
            {projects.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor={`projectName-${index}`} className="text-sm font-medium text-gray-700">
                Project Name *
              </Label>
              <Input
                id={`projectName-${index}`}
                value={project.name}
                onChange={(e) => updateProject(index, 'name', e.target.value)}
                placeholder="E-commerce Website"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`technologies-${index}`} className="text-sm font-medium text-gray-700">
                Technologies Used
              </Label>
              <Input
                id={`technologies-${index}`}
                value={project.technologies}
                onChange={(e) => updateProject(index, 'technologies', e.target.value)}
                placeholder="React, Node.js, MongoDB"
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Project Description *
            </Label>
            <AIWritingAssistant
              value={project.description}
              onChange={(value) => updateProject(index, 'description', value)}
              placeholder="Describe what you built, your role, challenges overcome, and impact..."
              userContext={getAIContext(project)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label htmlFor={`projectUrl-${index}`} className="text-sm font-medium text-gray-700">
                Live Demo URL
              </Label>
              <div className="relative">
                <Input
                  id={`projectUrl-${index}`}
                  value={project.url}
                  onChange={(e) => updateProject(index, 'url', e.target.value)}
                  placeholder="https://yourproject.com"
                  className="mt-1 pr-10"
                />
                <ExternalLink className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div>
              <Label htmlFor={`github-${index}`} className="text-sm font-medium text-gray-700">
                GitHub Repository
              </Label>
              <Input
                id={`github-${index}`}
                value={project.github}
                onChange={(e) => updateProject(index, 'github', e.target.value)}
                placeholder="https://github.com/username/repo"
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <Label htmlFor={`startDate-${index}`} className="text-sm font-medium text-gray-700">
                Start Date
              </Label>
              <Input
                id={`startDate-${index}`}
                value={project.startDate}
                onChange={(e) => updateProject(index, 'startDate', e.target.value)}
                placeholder="Jan 2024"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor={`endDate-${index}`} className="text-sm font-medium text-gray-700">
                End Date
              </Label>
              <Input
                id={`endDate-${index}`}
                value={project.endDate}
                onChange={(e) => updateProject(index, 'endDate', e.target.value)}
                placeholder="Mar 2024 or 'Ongoing'"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={addProject}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Project</span>
        </Button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Project Tips for Beginners</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include personal projects, school assignments, or coding bootcamp projects</li>
          <li>• Mention specific technologies and your role in the project</li>
          <li>• Add links to live demos or GitHub repositories when possible</li>
          <li>• Focus on what you learned and the impact of your work</li>
        </ul>
      </div>

      <div className="flex justify-between pt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevious}
          className="flex items-center space-x-2"
        >
          <span>← Previous</span>
        </Button>
        <div className="flex gap-3">
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 px-8"
          >
            Continue to Preview →
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProjectsForm;
