import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SkillsFormProps {
  data: {
    skills: string[];
  };
  onUpdate: (data: { skills: string[] }) => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function SkillsForm({ data, onUpdate, onNext, onPrevious }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      toast({
        title: "Error",
        description: "Please enter a skill",
        variant: "destructive",
      });
      return;
    }

    if (data.skills.includes(newSkill.trim())) {
      toast({
        title: "Error",
        description: "This skill already exists",
        variant: "destructive",
      });
      return;
    }

    const updatedSkills = [...data.skills, newSkill.trim()];
    onUpdate({ skills: updatedSkills });
    setNewSkill('');
    
    toast({
      title: "Success",
      description: "Skill added successfully",
    });
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = data.skills.filter(skill => skill !== skillToRemove);
    onUpdate({ skills: updatedSkills });
    
    toast({
      title: "Success",
      description: "Skill removed successfully",
    });
  };

  const handleNext = () => {
    try {
      if (onNext) {
        onNext();
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Error",
        description: "Failed to navigate to next step",
        variant: "destructive",
      });
    }
  };

  const handlePrevious = () => {
    try {
      if (onPrevious) {
        onPrevious();
      }
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Error",
        description: "Failed to navigate to previous step",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="skill">Add Skill</Label>
              <Input
                id="skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., JavaScript, Project Management, Adobe Photoshop"
              />
            </div>
            <Button
              type="button"
              onClick={handleAddSkill}
              className="mt-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {data.skills.length > 0 && (
            <div className="space-y-2">
              <Label>Your Skills</Label>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevious}
            disabled={!onPrevious}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            disabled={!onNext}
          >
            Projects
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default SkillsForm;