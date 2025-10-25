
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import LinkedInUrlInput from "./linkedin/LinkedInUrlInput";
import DemoProfiles from "./linkedin/DemoProfiles";
import ManualEntryForm from "./linkedin/ManualEntryForm";
import ProfilePreview from "./linkedin/ProfilePreview";
import PrivacyNotice from "./linkedin/PrivacyNotice";

interface LinkedInImportProps {
  onImport: (data: any) => void;
  onClose: () => void;
}

const LinkedInImport = ({ onImport, onClose }: LinkedInImportProps) => {
  const [importStep, setImportStep] = useState<'input' | 'success'>('input');
  const [importedProfile, setImportedProfile] = useState<any>(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');

  const handleImportSuccess = (profileData: any) => {
    setImportedProfile(profileData);
    setImportStep('success');
  };

  const handleConfirmImport = () => {
    if (importedProfile) {
      console.log('Confirming LinkedIn import with data:', importedProfile);
      
      const formattedData = {
        personalInfo: {
          fullName: importedProfile.personalInfo?.fullName || '',
          email: importedProfile.personalInfo?.email || '',
          phone: importedProfile.personalInfo?.phone || '',
          location: importedProfile.personalInfo?.location || '',
          linkedIn: importedProfile.personalInfo?.linkedIn || '',
          portfolio: importedProfile.personalInfo?.portfolio || '',
          summary: importedProfile.personalInfo?.summary || ''
        },
        experience: importedProfile.experience || [],
        education: importedProfile.education || [],
        projects: importedProfile.projects || [],
        skills: importedProfile.skills || [],
        summary: importedProfile.personalInfo?.summary || ''
      };
      
      console.log('Formatted data being sent to parent:', formattedData);
      onImport(formattedData);
    }
  };

  const handleImportDifferent = () => {
    setImportStep('input');
    setImportedProfile(null);
  };

  if (importStep === 'success' && importedProfile) {
    return (
      <ProfilePreview
        profileData={importedProfile}
        onConfirm={handleConfirmImport}
        onImportDifferent={handleImportDifferent}
        onClose={onClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Import from LinkedIn</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <LinkedInUrlInput onImportSuccess={handleImportSuccess} />
          
          <DemoProfiles onSelectProfile={setLinkedInUrl} />

          <ManualEntryForm onImport={onImport} />

          <PrivacyNotice />
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkedInImport;
