import React from 'react';

interface ATSScoreMeterProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showDetails?: boolean;
}

const ATSScoreMeter: React.FC<ATSScoreMeterProps> = ({ 
  score, 
  maxScore = 100, 
  size = 120, 
  strokeWidth = 8,
  className = "",
  showDetails = false
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = Math.min(Math.max(score, 0), maxScore) / maxScore;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage * circumference);

  // Color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 60) return '#f59e0b'; // yellow
    if (score >= 40) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color: scoreColor }}>
            {Math.round(score)}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            {showDetails ? `out of ${maxScore}` : `/${maxScore}`}
          </div>
          {showDetails && (
            <div className="text-xs text-gray-400 mt-1">
              ATS Score
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreMeter;