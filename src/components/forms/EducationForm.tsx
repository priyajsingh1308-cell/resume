
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  graduationDate: string;
  gpa: string;
  current: boolean;
}

interface EducationFormProps {
  data: any;
  onUpdate: (section: string, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  completedSteps?: Set<number>;
}

const EducationForm = ({ data, onUpdate, onNext, onPrevious, isLastStep, isFirstStep }: EducationFormProps) => {
  const [education, setEducation] = useState<Education[]>(
    data.education?.length > 0 ? data.education : [
      {
        id: '1',
        degree: '',
        school: '',
        location: '',
        graduationDate: '',
        gpa: '',
        current: false
      }
    ]
  );

  useEffect(() => {
    onUpdate('education', education);
  }, [education, onUpdate]);

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: '',
      current: false
    };
    setEducation([...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    if (education.length > 1) {
      setEducation(education.filter(edu => edu.id !== id));
    }
  };

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext && typeof onNext === 'function') {
      onNext();
    }
  };

  const handleNext = () => {
    if (onNext && typeof onNext === 'function') {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (onPrevious && typeof onPrevious === 'function') {
      onPrevious();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Add your educational background starting with your highest degree.
        </p>
      </div>

      {education.map((edu, index) => (
        <Card key={edu.id} className="border-2 border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg">
              Education {index + 1}
            </CardTitle>
            {education.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeEducation(edu.id)}
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
                  Degree/Certification *
                </Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Bachelor of Science in Computer Science"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  School/Institution *
                </Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  placeholder="University of California"
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
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="Berkeley, CA"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Graduation Date
                </Label>
                <Input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  disabled={edu.current}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  GPA (Optional)
                </Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${edu.id}`}
                checked={edu.current}
                onCheckedChange={(checked) => updateEducation(edu.id, 'current', checked)}
              />
              <Label htmlFor={`current-${edu.id}`} className="text-sm font-medium text-gray-700">
                I am currently pursuing this degree
              </Label>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Education
      </Button>

      <div className="flex justify-end pt-6">
        <div className="flex justify-between w-full">
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center space-x-2"
          >
            <span>← Previous</span>
          </Button>
          <div className="flex gap-3">
            <Button 
              type="button"
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 px-8"
            >
              Continue to Skills →
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EducationForm;
