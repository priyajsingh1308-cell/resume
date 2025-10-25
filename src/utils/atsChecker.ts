export interface ATSFeedback {
  category: string;
  score: number;
  feedback: string;
  suggestions: string[];
  maxScore: number;
  details: {
    found: string[];
    missing: string[];
    recommendations: string[];
  };
}

export interface ATSAnalysis {
  score: number;
  feedback: ATSFeedback[];
  breakdown: {
    contactInfo: number;
    skills: number;
    experience: number;
    education: number;
    formatting: number;
  };
  recommendations: string[];
}

export const calculateATSScore = (resumeData: any): ATSAnalysis => {
  console.log('=== ATS Score Calculation Started ===');
  console.log('Resume data received:', resumeData);

  if (!resumeData) {
    console.warn('No resume data provided');
    return getEmptyAnalysis();
  }

  const feedback: ATSFeedback[] = [];
  const breakdown = {
    contactInfo: 0,
    skills: 0,
    experience: 0,
    education: 0,
    formatting: 0
  };

  // 1. Contact Information Analysis (25 points max)
  const contactAnalysis = analyzeContactInfo(resumeData.personalInfo);
  feedback.push(contactAnalysis);
  breakdown.contactInfo = contactAnalysis.score;

  // 2. Skills Analysis (25 points max)
  const skillsAnalysis = analyzeSkills(resumeData.skills);
  feedback.push(skillsAnalysis);
  breakdown.skills = skillsAnalysis.score;

  // 3. Experience Analysis (25 points max)
  const experienceAnalysis = analyzeExperience(resumeData.experience);
  feedback.push(experienceAnalysis);
  breakdown.experience = experienceAnalysis.score;

  // 4. Education Analysis (15 points max)
  const educationAnalysis = analyzeEducation(resumeData.education);
  feedback.push(educationAnalysis);
  breakdown.education = educationAnalysis.score;

  // 5. Formatting & Structure Analysis (10 points max)
  const formattingAnalysis = analyzeFormatting(resumeData);
  feedback.push(formattingAnalysis);
  breakdown.formatting = formattingAnalysis.score;

  // Calculate total score (out of 100)
  const totalScore = Math.round(
    (breakdown.contactInfo + breakdown.skills + breakdown.experience + breakdown.education + breakdown.formatting)
  );

  // Generate overall recommendations
  const recommendations = generateRecommendations(feedback, totalScore);

  const analysis: ATSAnalysis = {
    score: Math.min(totalScore, 100),
    feedback,
    breakdown,
    recommendations
  };

  console.log('=== ATS Analysis Complete ===');
  console.log('Final score:', analysis.score);
  console.log('Breakdown:', breakdown);

  return analysis;
};

const analyzeContactInfo = (personalInfo: any): ATSFeedback => {
  console.log('Analyzing contact info:', personalInfo);
  
  let score = 0;
  const maxScore = 25;
  const found: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  // Essential contact fields (20 points)
  if (personalInfo?.fullName?.trim()) {
    score += 6;
    found.push('Full name');
  } else {
    missing.push('Full name');
    recommendations.push('Add your complete full name');
  }

  if (personalInfo?.email?.trim() && isValidEmail(personalInfo.email)) {
    score += 6;
    found.push('Professional email');
  } else {
    missing.push('Professional email');
    recommendations.push('Add a professional email address');
  }

  if (personalInfo?.phone?.trim()) {
    score += 4;
    found.push('Phone number');
  } else {
    missing.push('Phone number');
    recommendations.push('Include your phone number');
  }

  if (personalInfo?.location?.trim()) {
    score += 4;
    found.push('Location');
  } else {
    missing.push('Location');
    recommendations.push('Add your city and state/country');
  }

  // Optional but valuable fields (5 points)
  if (personalInfo?.linkedIn?.trim()) {
    score += 3;
    found.push('LinkedIn profile');
  } else {
    missing.push('LinkedIn profile');
    recommendations.push('Include your LinkedIn profile URL');
  }

  if (personalInfo?.portfolio?.trim()) {
    score += 2;
    found.push('Portfolio/website');
  } else {
    recommendations.push('Consider adding a portfolio or personal website');
  }

  const feedback = score >= 20 ? 
    'Complete contact information provided' : 
    score >= 15 ? 
    'Good contact information, minor improvements needed' :
    'Contact information needs significant improvement';

  return {
    category: 'Contact Information',
    score,
    maxScore,
    feedback,
    suggestions: recommendations.slice(0, 4),
    details: { found, missing, recommendations }
  };
};

const analyzeSkills = (skills: any[]): ATSFeedback => {
  console.log('Analyzing skills:', skills);
  
  let score = 0;
  const maxScore = 25;
  const found: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  if (!skills || !Array.isArray(skills)) {
    return {
      category: 'Skills & Keywords',
      score: 0,
      maxScore,
      feedback: 'No skills section found',
      suggestions: ['Add a skills section with relevant technical and soft skills'],
      details: { found: [], missing: ['Skills section'], recommendations: ['Create a comprehensive skills section'] }
    };
  }

  const validSkills = skills.filter(skill => skill && skill.trim().length > 0);
  
  // Base score for number of skills
  if (validSkills.length >= 15) {
    score += 8;
    found.push(`${validSkills.length} skills listed`);
  } else if (validSkills.length >= 10) {
    score += 6;
    found.push(`${validSkills.length} skills listed`);
  } else if (validSkills.length >= 7) {
    score += 4;
    found.push(`${validSkills.length} skills listed`);
  } else if (validSkills.length >= 5) {
    score += 2;
    found.push(`${validSkills.length} skills listed`);
  } else if (validSkills.length >= 3) {
    score += 1;
    found.push(`${validSkills.length} skills listed`);
  }

  if (validSkills.length < 8) {
    missing.push('More skills needed');
    recommendations.push(`Add ${8 - validSkills.length} more relevant skills`);
  }

  // Technical skills analysis (8 points)
  const technicalKeywords = [
    'javascript', 'python', 'java', 'react', 'node', 'sql', 'html', 'css', 'git',
    'aws', 'docker', 'kubernetes', 'typescript', 'angular', 'vue', 'mongodb',
    'postgresql', 'mysql', 'redis', 'graphql', 'rest', 'api', 'microservices',
    'agile', 'scrum', 'ci/cd', 'devops', 'linux', 'windows', 'macos'
  ];
  
  const technicalSkillsFound = validSkills.filter(skill => 
    technicalKeywords.some(keyword => 
      skill.toLowerCase().includes(keyword) || keyword.includes(skill.toLowerCase())
    )
  );

  if (technicalSkillsFound.length >= 8) {
    score += 8;
    found.push('Strong technical skills');
  } else if (technicalSkillsFound.length >= 5) {
    score += 6;
    found.push('Good technical skills');
  } else if (technicalSkillsFound.length >= 3) {
    score += 4;
    found.push('Some technical skills');
  } else if (technicalSkillsFound.length >= 1) {
    score += 2;
    found.push('Few technical skills');
  }

  if (technicalSkillsFound.length < 5) {
    missing.push('More technical skills');
    recommendations.push('Add more technical skills relevant to your field');
  }

  // Soft skills analysis (5 points)
  const softSkillKeywords = [
    'communication', 'leadership', 'teamwork', 'problem solving', 'management',
    'collaboration', 'analytical', 'creative', 'strategic', 'organizational',
    'time management', 'project management', 'critical thinking', 'adaptability'
  ];

  const softSkillsFound = validSkills.filter(skill =>
    softSkillKeywords.some(keyword => 
      skill.toLowerCase().includes(keyword) || keyword.includes(skill.toLowerCase())
    )
  );

  if (softSkillsFound.length >= 3) {
    score += 5;
    found.push('Good soft skills');
  } else if (softSkillsFound.length >= 2) {
    score += 3;
    found.push('Some soft skills');
  } else if (softSkillsFound.length >= 1) {
    score += 2;
    found.push('Few soft skills');
  }

  if (softSkillsFound.length < 3) {
    missing.push('More soft skills');
    recommendations.push('Include soft skills like communication, leadership, teamwork');
  }

  // Industry relevance (4 points)
  const industryKeywords = [
    'software', 'development', 'engineering', 'design', 'marketing', 'sales',
    'finance', 'healthcare', 'education', 'consulting', 'research', 'analysis'
  ];

  const industryRelevant = validSkills.some(skill =>
    industryKeywords.some(keyword => skill.toLowerCase().includes(keyword))
  );

  if (industryRelevant) {
    score += 4;
    found.push('Industry-relevant skills');
  } else {
    missing.push('Industry-specific skills');
    recommendations.push('Add skills specific to your target industry');
  }

  const feedback = score >= 20 ? 
    'Excellent skills section with strong keyword optimization' :
    score >= 15 ?
    'Good skills section, some improvements possible' :
    score >= 10 ?
    'Skills section needs enhancement' :
    'Skills section requires significant improvement';

  return {
    category: 'Skills & Keywords',
    score,
    maxScore,
    feedback,
    suggestions: recommendations.slice(0, 4),
    details: { found, missing, recommendations }
  };
};

const analyzeExperience = (experience: any[]): ATSFeedback => {
  console.log('Analyzing experience:', experience);
  
  let score = 0;
  const maxScore = 25;
  const found: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  if (!experience || !Array.isArray(experience) || experience.length === 0) {
    return {
      category: 'Work Experience',
      score: 0,
      maxScore,
      feedback: 'No work experience found',
      suggestions: ['Add your work experience with detailed descriptions'],
      details: { found: [], missing: ['Work experience'], recommendations: ['Add at least one work experience entry'] }
    };
  }

  const validExperience = experience.filter(exp => 
    exp && (exp.jobTitle?.trim() || exp.company?.trim())
  );

  // Base score for having experience entries (8 points)
  if (validExperience.length >= 4) {
    score += 8;
    found.push(`${validExperience.length} work positions`);
  } else if (validExperience.length >= 3) {
    score += 6;
    found.push(`${validExperience.length} work positions`);
  } else if (validExperience.length >= 2) {
    score += 4;
    found.push(`${validExperience.length} work positions`);
  } else if (validExperience.length >= 1) {
    score += 2;
    found.push(`${validExperience.length} work position`);
  }

  // Analyze each experience entry
  validExperience.forEach((exp, index) => {
    let entryScore = 0;
    const entryMax = 4; // Max points per entry

    // Job title and company (1 point)
    if (exp.jobTitle?.trim() && exp.company?.trim()) {
      entryScore += 1;
    } else {
      missing.push(`Complete info for position ${index + 1}`);
      recommendations.push(`Add job title and company for position ${index + 1}`);
    }

    // Dates (0.5 points)
    if (exp.startDate?.trim()) {
      entryScore += 0.5;
    } else {
      missing.push(`Start date for position ${index + 1}`);
      recommendations.push(`Add start date for ${exp.jobTitle || `position ${index + 1}`}`);
    }

    // Description quality (2.5 points)
    if (exp.description?.trim()) {
      const descLength = exp.description.trim().length;
      const wordCount = exp.description.trim().split(/\s+/).length;
      
      if (descLength >= 200 && wordCount >= 30) {
        entryScore += 2.5;
        found.push(`Detailed description for ${exp.jobTitle || `position ${index + 1}`}`);
      } else if (descLength >= 100 && wordCount >= 15) {
        entryScore += 1.5;
        found.push(`Good description for ${exp.jobTitle || `position ${index + 1}`}`);
      } else if (descLength >= 50) {
        entryScore += 0.5;
        found.push(`Basic description for ${exp.jobTitle || `position ${index + 1}`}`);
      } else {
        missing.push(`Detailed description for position ${index + 1}`);
        recommendations.push(`Expand description for ${exp.jobTitle || `position ${index + 1}`} (current: ${wordCount} words, target: 30+ words)`);
      }

      // Check for quantifiable achievements
      const hasMetrics = /\d+%|\d+\+|\$\d+|increased|improved|reduced|achieved|grew|saved|generated/i.test(exp.description);
      if (hasMetrics) {
        entryScore += 1;
        found.push(`Quantifiable achievements in ${exp.jobTitle || `position ${index + 1}`}`);
      } else {
        missing.push(`Metrics for position ${index + 1}`);
        recommendations.push(`Add quantifiable achievements to ${exp.jobTitle || `position ${index + 1}`} (e.g., "Increased sales by 25%")`);
      }

      // Check for action verbs
      const hasActionVerbs = /^•?\s*(Led|Developed|Implemented|Managed|Created|Designed|Built|Optimized|Achieved|Improved|Increased|Reduced|Streamlined|Coordinated|Executed)/im.test(exp.description);
      if (hasActionVerbs) {
        entryScore += 0.5;
        found.push(`Strong action verbs in ${exp.jobTitle || `position ${index + 1}`}`);
      } else {
        missing.push(`Action verbs for position ${index + 1}`);
        recommendations.push(`Start bullet points with action verbs for ${exp.jobTitle || `position ${index + 1}`}`);
      }
    } else {
      missing.push(`Description for position ${index + 1}`);
      recommendations.push(`Add detailed job description for ${exp.jobTitle || `position ${index + 1}`}`);
    }

    score += Math.min(entryScore, entryMax);
  });

  const feedback_text = score >= 20 ? 
    'Excellent work experience section with detailed descriptions' :
    score >= 15 ?
    'Good work experience section, some enhancements possible' :
    score >= 10 ?
    'Work experience section needs improvement' :
    'Work experience section requires significant enhancement';

  return {
    category: 'Work Experience',
    score,
    maxScore,
    feedback: feedback_text,
    suggestions: recommendations.slice(0, 5),
    details: { found, missing, recommendations }
  };
};

const analyzeEducation = (education: any[]): ATSFeedback => {
  console.log('Analyzing education:', education);
  
  let score = 0;
  const maxScore = 15;
  const found: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  if (!education || !Array.isArray(education) || education.length === 0) {
    return {
      category: 'Education',
      score: 0,
      maxScore,
      feedback: 'No education information found',
      suggestions: ['Add your educational background'],
      details: { found: [], missing: ['Education section'], recommendations: ['Add at least one education entry'] }
    };
  }

  const validEducation = education.filter(edu => 
    edu && (edu.degree?.trim() || edu.school?.trim())
  );

  // Base score for having education entries (5 points)
  if (validEducation.length >= 2) {
    score += 5;
    found.push(`${validEducation.length} education entries`);
  } else if (validEducation.length >= 1) {
    score += 3;
    found.push(`${validEducation.length} education entry`);
  }

  // Analyze each education entry
  validEducation.forEach((edu, index) => {
    let entryScore = 0;
    const entryMax = 5; // Max points per entry

    // Degree (2 points)
    if (edu.degree?.trim()) {
      entryScore += 2;
      found.push(`Degree for education ${index + 1}`);
    } else {
      missing.push(`Degree for education ${index + 1}`);
      recommendations.push(`Add degree information for education entry ${index + 1}`);
    }

    // School (2 points)
    if (edu.school?.trim()) {
      entryScore += 2;
      found.push(`Institution for education ${index + 1}`);
    } else {
      missing.push(`Institution for education ${index + 1}`);
      recommendations.push(`Add institution name for education entry ${index + 1}`);
    }

    // Graduation date (1 point)
    if (edu.graduationDate?.trim()) {
      entryScore += 1;
      found.push(`Graduation date for education ${index + 1}`);
    } else {
      missing.push(`Graduation date for education ${index + 1}`);
      recommendations.push(`Add graduation date for education entry ${index + 1}`);
    }

    // Bonus for GPA if high
    if (edu.gpa && parseFloat(edu.gpa) >= 3.5) {
      entryScore += 1;
      found.push(`High GPA (${edu.gpa})`);
    }

    score += Math.min(entryScore, entryMax);
  });

  // Additional recommendations
  if (validEducation.length === 0) {
    recommendations.push('Add your highest degree or relevant certifications');
  }
  if (!validEducation.some(edu => edu.gpa)) {
    recommendations.push('Consider adding GPA if 3.5 or higher');
  }

  const feedback = score >= 12 ? 
    'Complete education section' :
    score >= 8 ?
    'Good education section, minor improvements possible' :
    'Education section needs enhancement';

  return {
    category: 'Education',
    score,
    maxScore,
    feedback,
    suggestions: recommendations.slice(0, 4),
    details: { found, missing, recommendations }
  };
};

const analyzeFormatting = (resumeData: any): ATSFeedback => {
  console.log('Analyzing formatting and structure');
  
  let score = 0;
  const maxScore = 10;
  const found: string[] = [];
  const missing: string[] = [];
  const recommendations: string[] = [];

  // Check for major sections presence (6 points)
  const sections = [
    { key: 'personalInfo', name: 'Personal Information', weight: 2 },
    { key: 'experience', name: 'Work Experience', weight: 2 },
    { key: 'education', name: 'Education', weight: 1 },
    { key: 'skills', name: 'Skills', weight: 1 }
  ];

  sections.forEach(section => {
    const data = resumeData[section.key];
    const hasData = Array.isArray(data) ? data.length > 0 : 
                   data && Object.keys(data).some(key => data[key]?.toString().trim());
    
    if (hasData) {
      score += section.weight;
      found.push(section.name);
    } else {
      missing.push(section.name);
      recommendations.push(`Add ${section.name.toLowerCase()} section`);
    }
  });

  // Professional summary bonus (2 points)
  if (resumeData.personalInfo?.summary?.trim()) {
    score += 2;
    found.push('Professional summary');
  } else {
    missing.push('Professional summary');
    recommendations.push('Add a professional summary section');
  }

  // Projects section bonus (2 points)
  if (resumeData.projects && Array.isArray(resumeData.projects) && resumeData.projects.length > 0) {
    score += 2;
    found.push('Projects section');
  } else {
    recommendations.push('Consider adding a projects section to showcase your work');
  }

  const feedback = score >= 8 ? 
    'Well-structured resume with all key sections' :
    score >= 6 ?
    'Good structure, some sections could be added' :
    'Resume structure needs improvement';

  return {
    category: 'Formatting & Structure',
    score,
    maxScore,
    feedback,
    suggestions: recommendations.slice(0, 4),
    details: { found, missing, recommendations }
  };
};

const generateRecommendations = (feedback: ATSFeedback[], totalScore: number): string[] => {
  const recommendations: string[] = [];

  // Priority recommendations based on score
  if (totalScore < 60) {
    recommendations.push('Focus on completing all basic sections first');
    recommendations.push('Add detailed job descriptions with specific achievements');
    recommendations.push('Include a comprehensive skills section');
  } else if (totalScore < 80) {
    recommendations.push('Add quantifiable achievements to your experience');
    recommendations.push('Include more industry-specific keywords');
    recommendations.push('Expand your skills section with relevant technologies');
  } else {
    recommendations.push('Fine-tune your resume for specific job applications');
    recommendations.push('Consider adding a projects section if not present');
    recommendations.push('Optimize keywords for your target roles');
  }

  // Add specific recommendations from feedback
  feedback.forEach(item => {
    if (item.score < item.maxScore * 0.7) {
      recommendations.push(...item.suggestions.slice(0, 2));
    }
  });

  return [...new Set(recommendations)].slice(0, 8); // Remove duplicates and limit
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getEmptyAnalysis = (): ATSAnalysis => ({
  score: 0,
  feedback: [],
  breakdown: {
    contactInfo: 0,
    skills: 0,
    experience: 0,
    education: 0,
    formatting: 0
  },
  recommendations: ['Complete your resume sections to get ATS analysis']
});

// Export for backward compatibility
export { calculateATSScore as default };