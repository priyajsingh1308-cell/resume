
const PrivacyNotice = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h4 className="font-medium text-yellow-900 mb-2">🔒 Privacy & Demo Information</h4>
      <div className="text-sm text-yellow-800 space-y-2">
        <p>
          <strong>Demo Mode:</strong> This application demonstrates LinkedIn import functionality using simulated data. 
          Real LinkedIn integration requires backend API access and proper authentication.
        </p>
        <p>
          <strong>Privacy:</strong> No actual LinkedIn data is accessed or stored. All data shown is for demonstration purposes only.
        </p>
      </div>
    </div>
  );
};

export default PrivacyNotice;
