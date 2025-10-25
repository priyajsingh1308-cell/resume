import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import AIWritingAssistant from "../AIWritingAssistant";

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface ExperienceFormProps {
  data: any;
  onUpdate: (section: string, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  completedSteps?: Set<number>;
}

const ExperienceForm = ({ data, onUpdate, onNext, onPrevious }: ExperienceFormProps) => {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.experience?.length > 0 ? data.experience : [
      {
        id: '1',
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]
  );

  useEffect(() => {
    onUpdate('experience', experiences);
  }, [experiences, onUpdate]);

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setExperiences([...experiences, newExperience]);
  };

  const removeExperience = (id: string) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter(exp => exp.id !== id));
    }
  };

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Prepare context for AI writing assistant
  const getAIContext = (experience: Experience) => ({
    fullName: data?.personalInfo?.fullName,
    jobTitle: experience.jobTitle,
    company: experience.company,
    experience: data?.experience || [],
    skills: data?.skills || [],
    education: data?.education || []
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Add your work experience starting with your most recent position.
        </p>
      </div>

      {experiences.map((experience, index) => (
        <Card key={experience.id} className="border-2 border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">
              Experience {index + 1}
            </CardTitle>
            {experiences.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Job Title *
                </Label>
                <Input
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Company *
                </Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Location
                </Label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="San Francisco, CA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Start Date *
                </Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.current}
                  className="mt-1"
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                    className="mr-2"
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-sm text-gray-600">
                    Current position
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">
                Job Description *
              </Label>
              <AIWritingAssistant
                value={experience.description}
                onChange={(value) => updateExperience(experience.id, 'description', value)}
                placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver features on time&#10;• Improved application performance by 30% through code optimization"
                userContext={getAIContext(experience)}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Experience
      </Button>

      <div className="flex justify-end pt-6">
        <div className="flex justify-between w-full">
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
              Continue to Education →
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ExperienceForm;