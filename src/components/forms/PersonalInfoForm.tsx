
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck as CheckCircle, ArrowRight } from "lucide-react";
import AIWritingAssistant from "../AIWritingAssistant";

interface PersonalInfoFormProps {
  data: any;
  onUpdate: (section: string, data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLastStep: boolean;
  isFirstStep: boolean;
  completedSteps?: Set<number>;
}

const PersonalInfoForm = ({ data, onUpdate, onNext }: PersonalInfoFormProps) => {
  const { toast } = useToast();
  
  const isFormValid = () => {
    return formData.fullName && formData.email && formData.phone && formData.location;
  };

  const [formData, setFormData] = useState(() => {
    const defaults = {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      portfolio: '',
      summary: '',
    };
    return { ...defaults, ...(data?.personalInfo || {}) };
  });

  const [savedFields, setSavedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (data && data.personalInfo) {
      const defaults = {
        fullName: '', email: '', phone: '', location: '',
        linkedIn: '', portfolio: '', summary: ''
      };
      setFormData(prevFormData => ({
        ...defaults,
        ...prevFormData,
        ...data.personalInfo
      }));
    }
  }, [data]);

  // Auto-save with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onUpdate('personalInfo', formData);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData, onUpdate]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Show saved indicator
    setSavedFields(prev => new Set(prev).add(field));
    setTimeout(() => {
      setSavedFields(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optional validation - users can proceed even with incomplete data
    if (formData.fullName.trim()) {
      toast({
        title: "Information saved!",
        description: "Moving to next section...",
      });
    } else {
      toast({
        title: "Proceeding to next section",
        description: "You can return to complete this section anytime.",
      });
    }
    
    onNext();
  };

  const getFieldIcon = (field: string) => {
    if (savedFields.has(field)) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    return null;
  };

  // Prepare context for AI writing assistant
  const aiContext = {
    fullName: formData.fullName,
    experience: data?.experience || [],
    skills: data?.skills || [],
    education: data?.education || []
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-800">
          ✨ <strong>Auto-save enabled:</strong> Your information is automatically saved as you type!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name *
          </Label>
          <div className="relative">
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g., John Doe"
              required
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('fullName')}
            </div>
          </div>
        </div>
        <div className="relative">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="e.g., john@example.com"
              required
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('email')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number *
          </Label>
          <div className="relative">
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="e.g., +1 (555) 123-4567"
              required
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('phone')}
            </div>
          </div>
        </div>
        <div className="relative">
          <Label htmlFor="location" className="text-sm font-medium text-gray-700">
            Location *
          </Label>
          <div className="relative">
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g., New York, NY"
              required
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('location')}
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative">
          <Label htmlFor="linkedIn" className="text-sm font-medium text-gray-700">
            LinkedIn Profile (Optional)
          </Label>
          <div className="relative">
            <Input
              id="linkedIn"
              value={formData.linkedIn}
              onChange={(e) => handleChange('linkedIn', e.target.value)}
              placeholder="e.g., linkedin.com/in/johndoe"
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('linkedIn')}
            </div>
          </div>
        </div>
        <div className="relative">
          <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">
            Portfolio/Website (Optional)
          </Label>
          <div className="relative">
            <Input
              id="portfolio"
              value={formData.portfolio}
              onChange={(e) => handleChange('portfolio', e.target.value)}
              placeholder="e.g., johndoe.com"
              className="mt-1 pr-8"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              {getFieldIcon('portfolio')}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-700 mb-3 block">
          Professional Summary (Optional but Recommended)
        </Label>
        <AIWritingAssistant
          value={formData.summary}
          onChange={(value) => handleChange('summary', value)}
          placeholder="Write a brief summary of your professional background, key skills, and career objectives..."
          userContext={aiContext}
        />
      </div>

      <div className="flex items-center justify-between pt-6">
        <div className="text-sm text-gray-600">
          * Required fields
        </div>
        <div className="flex gap-3">
          <Button
            variant="default"
            onClick={onNext}
            className="flex items-center gap-2"
            disabled={!isFormValid()}
          >
           Experience
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalInfoForm;
