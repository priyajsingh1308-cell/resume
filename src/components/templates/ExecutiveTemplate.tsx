
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import EditableText from "../EditableText";

interface ExecutiveTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
  showPageBreaks?: boolean;
}

const ExecutiveTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'skills', 'experience', 'projects', 'education']
}: ExecutiveTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  // Render sections based on order
  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return personalInfo?.summary && (
          <section key={sectionId} className="mb-10" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Executive Summary
            </h2>
            <div className="text-gray-700 leading-relaxed text-lg">
              <EditableText
                value={personalInfo.summary}
                onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
                multiline
                isEditing={isEditing}
                className="inline-block w-full"
                placeholder="Executive summary"
              />
            </div>
          </section>
        );

      case 'skills':
        return skills?.length > 0 && (
          <section key={sectionId} className="mb-10" style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Core Competencies
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {skills.map((skill: string, index: number) => (
                <div key={index} className="text-gray-700 font-medium">
                  • <EditableText
                    value={skill || ''}
                    onSave={(value) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = value;
                      onUpdate?.('skills', '', updatedSkills.join(','));
                    }}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Skill"
                  />
                </div>
              ))}
            </div>
          </section>
        );

      case 'experience':
        return experience?.length > 0 && (
          <section key={sectionId} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide" style={{ pageBreakAfter: 'avoid' }}>
              Professional Experience
            </h2>
            <div className="space-y-8">
              {experience.map((exp: any, index: number) => (
                <div key={index} style={{ pageBreakInside: 'avoid', orphans: 3, widows: 3 }}>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Job Title"
                      />
                    </h3>
                    <span className="text-gray-600 font-medium">
                      <EditableText
                        value={exp.startDate || ''}
                        onSave={(value) => onUpdate?.('experience', 'startDate', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Start Date"
                      />
                      {' - '}
                      {exp.current ? 'Present' : (
                        <EditableText
                          value={exp.endDate || ''}
                          onSave={(value) => onUpdate?.('experience', 'endDate', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="End Date"
                        />
                      )}
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    <EditableText
                      value={exp.company || ''}
                      onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Company Name"
                    />
                  </p>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-gray-300">
                    <EditableText
                      value={exp.description || ''}
                      onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                      multiline
                      isEditing={isEditing}
                      className="inline-block w-full"
                      placeholder="Job description"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        return projects?.length > 0 && (
          <section key={sectionId} className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide" style={{ pageBreakAfter: 'avoid' }}>
              Key Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project: any, index: number) => (
                <div key={index} className="border-l-4 border-gray-800 pl-4" style={{ pageBreakInside: 'avoid', orphans: 2, widows: 2 }}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <EditableText
                      value={project.name || ''}
                      onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Project Name"
                    />
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    <EditableText
                      value={project.description || ''}
                      onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                      multiline
                      isEditing={isEditing}
                      className="inline-block w-full"
                      placeholder="Project description"
                    />
                  </div>
                  {project.technologies && (
                    <p className="text-gray-600 mt-2 font-medium">
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        return education?.length > 0 && (
          <section key={sectionId} style={{ pageBreakInside: 'avoid' }}>
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="flex justify-between items-center" style={{ pageBreakInside: 'avoid' }}>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={edu.degree || ''}
                        onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Degree"
                      />
                    </h3>
                    <p className="text-gray-700 font-medium">
                      <EditableText
                        value={edu.school || ''}
                        onSave={(value) => onUpdate?.('education', 'school', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="School Name"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium">
                    <EditableText
                      value={edu.graduationDate || ''}
                      onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Graduation Date"
                    />
                  </span>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`max-w-4xl mx-auto bg-white ${isPDFMode ? 'p-6' : 'p-8'} shadow-lg min-h-[297mm]`}>
      {/* Header with Fixed Layout */}
      <header className="border-b-4 border-gray-800 pb-6 mb-8 no-break">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 w-full">
          <div className="flex-1 min-w-0 max-w-full">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-4 break-words leading-tight">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Your Name"
                isEditing={isEditing}
                className="inline-block"
              />
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-lg lg:text-xl text-gray-700 mb-4 font-medium">
                <EditableText
                  value={personalInfo.jobTitle}
                  onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Professional Title"
                />
              </p>
            )}
            <div className="space-y-2 text-gray-600">
              {personalInfo?.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <EditableText
                    value={personalInfo.email}
                    onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                    isEditing={isEditing}
                    className="inline-block break-all"
                    placeholder="email@example.com"
                  />
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <EditableText
                    value={personalInfo.phone}
                    onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="123-456-7890"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="lg:text-right text-gray-600 space-y-2 flex-shrink-0 lg:pl-4 max-w-full lg:max-w-xs">
            {personalInfo?.location && (
              <div className="flex items-center space-x-2 lg:justify-end">
                <span className="break-words">
                  <EditableText
                    value={personalInfo.location}
                    onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Location"
                  />
                </span>
                <MapPin className="w-4 h-4 flex-shrink-0" />
              </div>
            )}
            {personalInfo?.linkedIn && (
              <div className="flex items-center space-x-2 lg:justify-end">
                <span className="break-words">
                  <EditableText
                    value={personalInfo.linkedIn}
                    onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="LinkedIn URL"
                  />
                </span>
                <Linkedin className="w-4 h-4 flex-shrink-0" />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center space-x-2 lg:justify-end">
                <span className="break-words">
                  <EditableText
                    value={personalInfo.portfolio}
                    onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Portfolio URL"
                  />
                </span>
                <Globe className="w-4 h-4 flex-shrink-0" />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Render sections in the specified order */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}
    </div>
  );
};

export default ExecutiveTemplate;
