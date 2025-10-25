
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import EditableText from "../EditableText";


interface CreativeTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const CreativeTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: CreativeTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm]">
      {/* Header with Improved Spacing and Layout */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg mb-10" style={{ pageBreakInside: 'avoid' }}>
        <h1 className="text-4xl font-bold mb-6 text-center">
          <EditableText
            value={personalInfo?.fullName || ''}
            onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
            placeholder="Your Name"
            isEditing={isEditing}
            className="inline-block text-white"
          />
        </h1>
        
        {/* Primary Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
          {personalInfo?.email && (
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="email@example.com"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="123-456-7890"
              />
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.location}
                onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="City, State"
              />
            </div>
          )}
        </div>

        {/* Secondary Contact Information */}
        {(personalInfo?.linkedIn || personalInfo?.portfolio) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {personalInfo?.linkedIn && (
              <div className="flex items-center justify-center space-x-3">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.linkedIn}
                  onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="linkedin.com/in/username"
                />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="portfolio.com"
                />
              </div>
            )}
          </div>
        )}
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Summary */}
          {personalInfo?.summary && (
            <section style={{ pageBreakInside: 'avoid' }}>
              <h2 className="text-lg font-bold text-purple-600 mb-3 border-b-2 border-purple-200 pb-1">
                About Me
              </h2>
              <div className="text-gray-700 text-sm leading-relaxed">
                <EditableText
                  value={personalInfo.summary}
                  onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
                  multiline
                  isEditing={isEditing}
                  className="inline-block w-full"
                  placeholder="Professional summary"
                />
              </div>
            </section>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <section style={{ pageBreakInside: 'avoid' }}>
              <h2 className="text-lg font-bold text-purple-600 mb-3 border-b-2 border-purple-200 pb-1">
                Skills
              </h2>
              <div className="space-y-2">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="bg-purple-100 text-purple-800 px-3 py-2 rounded text-sm">
                    <EditableText
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
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2" style={{ pageBreakAfter: 'avoid' }}>
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg" style={{ pageBreakInside: 'avoid', orphans: 3, widows: 3 }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          <EditableText
                            value={exp.jobTitle || ''}
                            onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                            isEditing={isEditing}
                            className="inline-block"
                            placeholder="Job Title"
                          />
                        </h3>
                        <p className="text-purple-600 font-medium">
                          <EditableText
                            value={exp.company || ''}
                            onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                            isEditing={isEditing}
                            className="inline-block"
                            placeholder="Company Name"
                          />
                        </p>
                      </div>
                      <span className="text-gray-600 text-sm">
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
                    <div className="text-gray-700 text-sm whitespace-pre-line">
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
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2" style={{ pageBreakAfter: 'avoid' }}>
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg" style={{ pageBreakInside: 'avoid', orphans: 2, widows: 2 }}>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      <EditableText
                        value={project.name || ''}
                        onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Project Name"
                      />
                    </h3>
                    <div className="text-gray-700 text-sm whitespace-pre-line">
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
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <span key={i} className="bg-purple-100 text-purple-800 px-3 py-1 rounded text-xs">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section style={{ pageBreakInside: 'avoid' }}>
              <h2 className="text-xl font-bold text-purple-600 mb-4 border-b-2 border-purple-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-50 p-6 rounded-lg" style={{ pageBreakInside: 'avoid' }}>
                    <h3 className="font-semibold text-gray-900">
                      <EditableText
                        value={edu.degree || ''}
                        onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Degree"
                      />
                    </h3>
                    <p className="text-purple-600 font-medium">
                      <EditableText
                        value={edu.school || ''}
                        onSave={(value) => onUpdate?.('education', 'school', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="School Name"
                      />
                    </p>
                    <p className="text-gray-600 text-sm">
                      <EditableText
                        value={edu.graduationDate || ''}
                        onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Graduation Date"
                      />
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
