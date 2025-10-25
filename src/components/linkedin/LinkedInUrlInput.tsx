
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Download, AlertCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LinkedInUrlInputProps {
  onImportSuccess: (data: any) => void;
}

const LinkedInUrlInput = ({ onImportSuccess }: LinkedInUrlInputProps) => {
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importStep, setImportStep] = useState<'input' | 'processing' | 'error'>('input');
  const { toast } = useToast();

  const validateLinkedInUrl = (url: string) => {
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
    return linkedInPattern.test(url);
  };

  const simulateLinkedInAPI = async (profileUrl: string) => {
    // Demo data simulation - in a real app, this would connect to LinkedIn API
    const profiles = {
      'john-doe': {
        personalInfo: {
          fullName: 'John Doe',
          email: 'john.doe@email.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          linkedIn: profileUrl,
          portfolio: 'https://johndoe.dev',
          summary: 'Experienced Software Developer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about building scalable web applications and leading cross-functional teams.'
        },
        experience: [
          {
            jobTitle: 'Senior Software Engineer',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            startDate: '2022',
            endDate: '',
            current: true,
            description: '• Led development of microservices architecture serving 1M+ users\n• Mentored junior developers and improved team productivity by 30%\n• Implemented CI/CD pipelines reducing deployment time by 50%'
          },
          {
            jobTitle: 'Software Engineer',
            company: 'StartupXYZ',
            location: 'Remote',
            startDate: '2020',
            endDate: '2022',
            current: false,
            description: '• Developed React applications with modern JavaScript/TypeScript\n• Collaborated with design team to implement responsive UI components\n• Optimized application performance achieving 95+ Lighthouse scores'
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            school: 'University of California',
            location: 'Berkeley, CA',
            graduationDate: '2019',
            gpa: '3.8'
          }
        ],
        skills: [
          'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'Git', 'CI/CD', 'Agile'
        ],
        projects: [
          {
            name: 'E-commerce Platform',
            description: 'Full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.',
            technologies: 'React, Node.js, MongoDB, Stripe API, AWS',
            url: 'https://ecommerce-demo.com',
            github: 'https://github.com/johndoe/ecommerce',
            startDate: '2023',
            endDate: '2023'
          }
        ]
      },
      'jane-smith': {
        personalInfo: {
          fullName: 'Jane Smith',
          email: 'jane.smith@email.com',
          phone: '+1 (555) 987-6543',
          location: 'New York, NY',
          linkedIn: profileUrl,
          portfolio: 'https://janesmith.design',
          summary: 'Creative UX/UI Designer with 4+ years of experience designing intuitive digital experiences. Specialized in user research, prototyping, and design systems.'
        },
        experience: [
          {
            jobTitle: 'Senior UX Designer',
            company: 'Design Studio',
            location: 'New York, NY',
            startDate: '2021',
            endDate: '',
            current: true,
            description: '• Led design for mobile app with 500K+ users\n• Conducted user research and usability testing\n• Created comprehensive design system'
          }
        ],
        education: [
          {
            degree: 'Master of Fine Arts in Design',
            school: 'Parsons School of Design',
            location: 'New York, NY',
            graduationDate: '2020',
            gpa: '3.9'
          }
        ],
        skills: [
          'Figma', 'Sketch', 'Adobe Creative Suite', 'Prototyping', 'User Research', 'Wireframing', 'Design Systems'
        ],
        projects: [
          {
            name: 'Mobile Banking App',
            description: 'Redesigned mobile banking app interface improving user satisfaction by 40%',
            technologies: 'Figma, Principle, InVision',
            url: 'https://dribbble.com/shots/banking-app',
            startDate: '2023',
            endDate: '2023'
          }
        ]
      }
    };

    const usernameMatch = profileUrl.match(/\/in\/([^\/]+)/);
    const username = usernameMatch ? usernameMatch[1] : '';
    
    return profiles[username as keyof typeof profiles] || profiles['john-doe'];
  };

  const handleAutoImport = async () => {
    if (!validateLinkedInUrl(linkedInUrl)) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)",
        variant: "destructive"
      });
      return;
    }

    setIsImporting(true);
    setImportStep('processing');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const profileData = await simulateLinkedInAPI(linkedInUrl);
      console.log('LinkedIn profile data retrieved:', profileData);
      
      toast({
        title: "Demo Profile Imported",
        description: "Demo data has been imported successfully. This is simulated data for demonstration purposes.",
      });
      
      onImportSuccess(profileData);
      
    } catch (error) {
      console.error('LinkedIn import error:', error);
      setImportStep('error');
      toast({
        title: "Import Failed",
        description: "Failed to import LinkedIn profile. Please try again or use manual entry.",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Demo LinkedIn Import</h4>
            <p className="text-sm text-blue-800">
              This is a demo simulation. Real LinkedIn integration requires backend API access. 
              Try our demo profiles or enter any LinkedIn URL to see how it would work.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold">LinkedIn Profile Import (Demo)</h3>
      <div className="space-y-2">
        <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
        <Input
          id="linkedin-url"
          placeholder="https://linkedin.com/in/your-profile"
          value={linkedInUrl}
          onChange={(e) => setLinkedInUrl(e.target.value)}
          className={!validateLinkedInUrl(linkedInUrl) && linkedInUrl ? 'border-red-300' : ''}
        />
        {linkedInUrl && !validateLinkedInUrl(linkedInUrl) && (
          <p className="text-sm text-red-600">Please enter a valid LinkedIn profile URL</p>
        )}
      </div>
      
      {importStep === 'processing' && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Simulating LinkedIn profile import...</span>
          </div>
          <div className="mt-2 text-sm text-blue-700">
            This is a demo simulation for testing purposes.
          </div>
        </div>
      )}

      {importStep === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-red-800">Import failed. Please try again or use manual entry.</span>
          </div>
        </div>
      )}

      <Button 
        onClick={handleAutoImport}
        disabled={!linkedInUrl || isImporting || !validateLinkedInUrl(linkedInUrl)}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isImporting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Importing Demo Profile...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            Import Demo Profile Data
          </>
        )}
      </Button>
    </div>
  );
};

export default LinkedInUrlInput;
