
const PageBreakIndicator = () => {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {/* Page 1 boundary - intelligent break point */}
      <div 
        className="absolute left-0 right-0 border-t-2 border-dashed border-blue-400 bg-blue-50"
        style={{ 
          top: '250mm', // Adjusted for intelligent section breaks
          height: '2px'
        }}
      >
        <div className="absolute right-2 -top-6 bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-800">
          Page 1 End - Sections break intelligently
        </div>
      </div>
      
      {/* Page 2 boundary */}
      <div 
        className="absolute left-0 right-0 border-t-2 border-dashed border-blue-400 bg-blue-50"
        style={{ 
          top: '547mm', // Page 2 end (297mm + 250mm)
          height: '2px'
        }}
      >
        <div className="absolute right-2 -top-6 bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-800">
          Page 2 End - Clean Section Breaks
        </div>
      </div>

      {/* Page 3 boundary for longer resumes */}
      <div 
        className="absolute left-0 right-0 border-t-2 border-dashed border-blue-400 bg-blue-50"
        style={{ 
          top: '844mm', // Page 3 end (297mm + 297mm + 250mm)
          height: '2px'
        }}
      >
        <div className="absolute right-2 -top-6 bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-800">
          Page 3 End - No Split Sections
        </div>
      </div>

      {/* Page indicators with intelligent break info */}
      <div className="absolute left-2 top-2 bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800">
        Page 1 - Header + First Sections
      </div>
      <div 
        className="absolute left-2 bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800"
        style={{ top: '260mm' }}
      >
        Page 2 - Complete Sections Only
      </div>
      <div 
        className="absolute left-2 bg-green-100 px-2 py-1 rounded text-xs font-medium text-green-800"
        style={{ top: '557mm' }}
      >
        Page 3 - No Split Content
      </div>
    </div>
  );
};

export default PageBreakIndicator;
