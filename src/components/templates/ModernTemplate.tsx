import React from 'react';
import EditableText from '../EditableText';

interface ModernTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
  activeSection?: string | null;
}

const ModernTemplate = ({ data, onUpdate, isEditing = false, isPDFMode = false, activeSection }: ModernTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data || {};

  // Helper function to update data
  const updateData = (section: string, field: string, value: string, index?: number) => {
    if (!onUpdate) return;
    
    if (index !== undefined) {
      // Handle array updates
      if (section === 'skills') {
        const skillsArray = value.split(',').map(s => s.trim()).filter(s => s);
        onUpdate(section, skillsArray);
      } else {
        const currentData = data[section] || [];
        const updatedData = [...currentData];
        updatedData[index] = {
          ...updatedData[index],
          [field]: value
        };
        onUpdate(section, updatedData);
      }
    } else {
      // Handle object updates
      const updatedData = {
        ...data[section],
        [field]: value
      };
      onUpdate(section, updatedData);
    }
  };

  // Helper function to check if data exists and is not empty
  const hasData = (value: any) => {
    if (Array.isArray(value)) return value && value.length > 0;
    return value && value.toString().trim() !== '';
  };

  // Debug logging for PDF generation
  console.log('ModernTemplate rendering with data:', {
    personalInfo: personalInfo ? Object.keys(personalInfo) : 'none',
    experienceCount: experience?.length || 0,
    educationCount: education?.length || 0,
    skillsCount: skills?.length || 0,
    projectsCount: projects?.length || 0
  });

  return (
    <div className={`resume-wrapper tight-spacing ${isPDFMode ? 'pdf-mode' : ''}`}>
      {/* Header Section */}
      <section className={`no-break mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg ${
        activeSection === 'personalInfo' ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
      }`}>
        <h1 className="text-4xl font-bold mb-2">
          {isEditing ? (
            <EditableText
              value={personalInfo?.fullName || ''}
              onSave={(value) => updateData('personalInfo', 'fullName', value)}
              placeholder="Your Name"
              isEditing={isEditing}
              className="inline-block text-white"
            />
          ) : (
            hasData(personalInfo?.fullName) ? personalInfo.fullName : 'Your Name'
          )}
        </h1>
        {(hasData(personalInfo?.jobTitle) || isEditing) && (
          <p className="text-xl mb-4 opacity-90 font-medium">
            {isEditing ? (
              <EditableText
                value={personalInfo?.jobTitle || ''}
                onSave={(value) => updateData('personalInfo', 'jobTitle', value)}
                placeholder="Job Title"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            ) : (
              personalInfo.jobTitle
            )}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {hasData(personalInfo?.email) && (
            <span>📧 {isEditing ? (
              <EditableText
                value={personalInfo.email}
                onSave={(value) => updateData('personalInfo', 'email', value)}
                placeholder="email@example.com"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            ) : personalInfo.email}</span>
          )}
          {hasData(personalInfo?.phone) && (
            <span>📱 {isEditing ? (
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => updateData('personalInfo', 'phone', value)}
                placeholder="Phone"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            ) : personalInfo.phone}</span>
          )}
          {hasData(personalInfo?.location) && (
            <span>📍 {isEditing ? (
              <EditableText
                value={personalInfo.location}
                onSave={(value) => updateData('personalInfo', 'location', value)}
                placeholder="Location"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            ) : personalInfo.location}</span>
          )}
          {hasData(personalInfo?.linkedIn) && (
            <span>🔗 LinkedIn</span>
          )}
          {hasData(personalInfo?.portfolio) && (
            <span>🌐 Portfolio</span>
          )}
        </div>
      </section>

      {/* Summary */}
      {(hasData(personalInfo?.summary) || isEditing) && (
        <section className={`section-break tight-spacing ${
          activeSection === 'personalInfo' ? 'ring-4 ring-blue-400 ring-opacity-50 rounded-lg p-4' : ''
        }`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2 no-break">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed allow-break">
            {isEditing ? (
              <EditableText
                value={personalInfo?.summary || ''}
                onSave={(value) => updateData('personalInfo', 'summary', value)}
                placeholder="Professional summary"
                isEditing={isEditing}
                multiline
                className="inline-block w-full"
              />
            ) : (
              personalInfo?.summary || 'Add your professional summary'
            )}
          </p>
        </section>
      )}

      {/* Experience */}
      {(hasData(experience) || isEditing) && (
        <section className={`section-break tight-spacing ${
          activeSection === 'experience' ? 'ring-4 ring-blue-400 ring-opacity-50 rounded-lg p-4' : ''
        }`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {(experience || []).map((exp: any, index: number) => (
              <div key={index} className="no-break">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {isEditing ? (
                        <EditableText
                          value={exp?.jobTitle || ''}
                          onSave={(value) => updateData('experience', 'jobTitle', value, index)}
                          placeholder="Job Title"
                          isEditing={isEditing}
                          className="inline-block"
                        />
                      ) : (
                        hasData(exp?.jobTitle) ? exp.jobTitle : 'Job Title'
                      )}
                    </h3>
                    <p className="text-lg font-semibold text-blue-600">
                      {isEditing ? (
                        <EditableText
                          value={exp?.company || ''}
                          onSave={(value) => updateData('experience', 'company', value, index)}
                          placeholder="Company Name"
                          isEditing={isEditing}
                          className="inline-block"
                        />
                      ) : (
                        hasData(exp?.company) ? exp.company : 'Company Name'
                      )}
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">
                    {isEditing ? (
                      <>
                        <EditableText
                          value={exp?.startDate || ''}
                          onSave={(value) => updateData('experience', 'startDate', value, index)}
                          placeholder="Start"
                          isEditing={isEditing}
                          className="inline-block"
                        />
                        {' - '}
                        {exp?.current ? 'Present' : (
                          <EditableText
                            value={exp?.endDate || ''}
                            onSave={(value) => updateData('experience', 'endDate', value, index)}
                            placeholder="End"
                            isEditing={isEditing}
                            className="inline-block"
                          />
                        )}
                      </>
                    ) : (
                      `${hasData(exp?.startDate) ? exp.startDate : 'Start'} - ${exp?.current ? 'Present' : (hasData(exp?.endDate) ? exp.endDate : 'End')}`
                    )}
                  </span>
                </div>
                {(hasData(exp?.description) || isEditing) && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4 border-l-4 border-blue-200 pl-4">
                    {isEditing ? (
                      <EditableText
                        value={exp?.description || ''}
                        onSave={(value) => updateData('experience', 'description', value, index)}
                        placeholder="Job description and achievements"
                        isEditing={isEditing}
                        multiline
                        className="inline-block w-full"
                      />
                    ) : (
                      exp?.description || 'Add job description'
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Education Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 tight-spacing">
        {/* Skills */}
        {(hasData(skills) || isEditing) && (
          <section className={`no-break ${
            activeSection === 'skills' ? 'ring-4 ring-blue-400 ring-opacity-50 rounded-lg p-4' : ''
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {(skills || []).filter(skill => hasData(skill) || isEditing).map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {isEditing ? (
                    <EditableText
                      value={skill || ''}
                      onSave={(value) => {
                        const updatedSkills = [...(skills || [])];
                        updatedSkills[index] = value;
                        onUpdate?.('skills', updatedSkills);
                      }}
                      placeholder="Skill"
                      isEditing={isEditing}
                      className="inline-block"
                    />
                  ) : (
                    skill || 'Add skill'
                  )}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {(hasData(education) || isEditing) && (
          <section className={`no-break ${
            activeSection === 'education' ? 'ring-4 ring-blue-400 ring-opacity-50 rounded-lg p-4' : ''
          }`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-500 pb-2">
              Education
            </h2>
            <div className="space-y-3">
              {(education || []).map((edu: any, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-bold text-gray-900">
                    {isEditing ? (
                      <EditableText
                        value={edu?.degree || ''}
                        onSave={(value) => updateData('education', 'degree', value, index)}
                        placeholder="Degree"
                        isEditing={isEditing}
                        className="inline-block"
                      />
                    ) : (
                      hasData(edu?.degree) ? edu.degree : 'Degree'
                    )}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    {isEditing ? (
                      <EditableText
                        value={edu?.school || ''}
                        onSave={(value) => updateData('education', 'school', value, index)}
                        placeholder="School Name"
                        isEditing={isEditing}
                        className="inline-block"
                      />
                    ) : (
                      hasData(edu?.school) ? edu.school : 'School Name'
                    )}
                  </p>
                  {(hasData(edu?.graduationDate) || isEditing) && (
                    <p className="text-gray-600">
                      {isEditing ? (
                        <EditableText
                          value={edu?.graduationDate || ''}
                          onSave={(value) => updateData('education', 'graduationDate', value, index)}
                          placeholder="Graduation Date"
                          isEditing={isEditing}
                          className="inline-block"
                        />
                      ) : (
                        edu?.graduationDate
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {(hasData(projects) || isEditing) && (
        <section className={`no-break tight-spacing ${
          activeSection === 'projects' ? 'ring-4 ring-blue-400 ring-opacity-50 rounded-lg p-4' : ''
        }`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
            Key Projects
          </h2>
          <div className="space-y-6">
            {(projects || []).map((project: any, index: number) => (
              <div key={index} className="no-break border-l-4 border-blue-200 pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {isEditing ? (
                    <EditableText
                      value={project?.name || ''}
                      onSave={(value) => updateData('projects', 'name', value, index)}
                      placeholder="Project Name"
                      isEditing={isEditing}
                      className="inline-block"
                    />
                  ) : (
                    hasData(project?.name) ? project.name : 'Project Name'
                  )}
                </h3>
                {(hasData(project?.description) || isEditing) && (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-2">
                    {isEditing ? (
                      <EditableText
                        value={project?.description || ''}
                        onSave={(value) => updateData('projects', 'description', value, index)}
                        placeholder="Project description"
                        isEditing={isEditing}
                        multiline
                        className="inline-block w-full"
                      />
                    ) : (
                      project?.description || 'Add project description'
                    )}
                  </p>
                )}
                {(hasData(project?.technologies) || isEditing) && (
                  <p className="text-blue-600 font-medium text-sm">
                    Technologies: {isEditing ? (
                      <EditableText
                        value={project?.technologies || ''}
                        onSave={(value) => updateData('projects', 'technologies', value, index)}
                        placeholder="Technologies used"
                        isEditing={isEditing}
                        className="inline-block"
                      />
                    ) : (
                      project?.technologies || 'Add technologies'
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty State Message */}
      {!hasData(personalInfo?.fullName) && !hasData(experience) && !hasData(education) && !hasData(skills) && !hasData(projects) && !isEditing && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Complete the previous steps to see your resume preview here.</p>
          <p className="text-sm mt-2">Your information will appear as you fill out each section.</p>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;