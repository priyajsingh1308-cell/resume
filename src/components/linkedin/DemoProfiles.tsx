
interface DemoProfilesProps {
  onSelectProfile: (url: string) => void;
}

const DemoProfiles = ({ onSelectProfile }: DemoProfilesProps) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-blue-900 mb-2">💡 Try These Demo Profiles</h4>
      <p className="text-sm text-blue-800 mb-3">
        Click on any profile below to see how LinkedIn import would work with real data:
      </p>
      <div className="space-y-2 text-sm">
        <button 
          onClick={() => onSelectProfile('https://linkedin.com/in/john-doe')}
          className="text-blue-700 hover:underline block text-left"
        >
          https://linkedin.com/in/john-doe (Software Engineer - Full Profile)
        </button>
        <button 
          onClick={() => onSelectProfile('https://linkedin.com/in/jane-smith')}
          className="text-blue-700 hover:underline block text-left"
        >
          https://linkedin.com/in/jane-smith (UX Designer - Full Profile)
        </button>
      </div>
    </div>
  );
};

export default DemoProfiles;
