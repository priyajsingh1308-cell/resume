
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface ProfilePreviewProps {
  profileData: any;
  onConfirm: () => void;
  onImportDifferent: () => void;
  onClose: () => void;
}

const ProfilePreview = ({ profileData, onConfirm, onImportDifferent, onClose }: ProfilePreviewProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span>Profile Imported Successfully</span>
            </CardTitle>
            <Button variant="ghost" onClick={onClose}>×</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">✅ Import Complete</h4>
            <p className="text-sm text-green-800">
              We've successfully imported your LinkedIn profile data. Review the information below and proceed to build your resume.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Name:</strong> {profileData.personalInfo?.fullName}</p>
                <p><strong>Email:</strong> {profileData.personalInfo?.email}</p>
                <p><strong>Location:</strong> {profileData.personalInfo?.location}</p>
                <p><strong>Summary:</strong> {profileData.personalInfo?.summary}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Experience ({profileData.experience?.length || 0} positions)</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                {profileData.experience?.slice(0, 2).map((exp: any, index: number) => (
                  <div key={index} className="mb-2">
                    <p><strong>{exp.jobTitle}</strong> at {exp.company}</p>
                    <p className="text-sm text-gray-600">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                  </div>
                ))}
                {profileData.experience?.length > 2 && (
                  <p className="text-sm text-gray-600">... and {profileData.experience.length - 2} more</p>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Skills ({profileData.skills?.length || 0} skills)</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p>{profileData.skills?.slice(0, 8).join(', ')}
                  {profileData.skills?.length > 8 && '...'}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              onClick={onConfirm}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Use This Data
            </Button>
            <Button 
              variant="outline"
              onClick={onImportDifferent}
              className="flex-1"
            >
              Import Different Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePreview;
