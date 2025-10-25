
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ManualEntryFormProps {
  onImport: (data: any) => void;
}

const ManualEntryForm = ({ onImport }: ManualEntryFormProps) => {
  const { toast } = useToast();
  const [manualData, setManualData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    portfolio: '',
    summary: '',
    currentJob: '',
    currentCompany: '',
  });

  const handleManualImport = () => {
    if (!manualData.fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter at least your full name to continue.",
        variant: "destructive"
      });
      return;
    }

    const importedData = {
      personalInfo: {
        fullName: manualData.fullName,
        email: manualData.email,
        phone: manualData.phone,
        location: manualData.location,
        linkedIn: manualData.linkedIn,
        portfolio: manualData.portfolio,
        summary: manualData.summary
      },
      experience: manualData.currentJob ? [{
        jobTitle: manualData.currentJob,
        company: manualData.currentCompany,
        location: manualData.location,
        startDate: new Date().getFullYear().toString(),
        endDate: '',
        current: true,
        description: ''
      }] : [],
      education: [],
      skills: [],
      projects: []
    };
    
    console.log('Manual data being sent to parent:', importedData);
    
    toast({
      title: "Data Imported",
      description: "Your information has been imported successfully.",
      variant: "default"
    });
    
    onImport(importedData);
  };

  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Manual Entry</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={manualData.fullName}
              onChange={(e) => setManualData({...manualData, fullName: e.target.value})}
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={manualData.email}
              onChange={(e) => setManualData({...manualData, email: e.target.value})}
              placeholder="john@example.com"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={manualData.phone}
              onChange={(e) => setManualData({...manualData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={manualData.location}
              onChange={(e) => setManualData({...manualData, location: e.target.value})}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currentJob">Current Job Title</Label>
            <Input
              id="currentJob"
              value={manualData.currentJob}
              onChange={(e) => setManualData({...manualData, currentJob: e.target.value})}
              placeholder="Software Engineer"
            />
          </div>
          <div>
            <Label htmlFor="currentCompany">Current Company</Label>
            <Input
              id="currentCompany"
              value={manualData.currentCompany}
              onChange={(e) => setManualData({...manualData, currentCompany: e.target.value})}
              placeholder="Tech Corp"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={manualData.summary}
            onChange={(e) => setManualData({...manualData, summary: e.target.value})}
            placeholder="Brief description of your professional background and key skills..."
            rows={4}
          />
        </div>

        <Button 
          onClick={handleManualImport}
          className="w-full"
          variant="outline"
        >
          Import Manual Data
        </Button>
      </div>
    </div>
  );
};

export default ManualEntryForm;
