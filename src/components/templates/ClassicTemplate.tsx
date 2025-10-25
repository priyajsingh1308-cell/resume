
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import EditableText from "../EditableText";


interface ClassicTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const ClassicTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: ClassicTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-6 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Header with Improved Spacing */}
      <div className="no-break">
        <header className="text-center border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          <EditableText
            value={personalInfo?.fullName || ''}
            onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
            placeholder="Your Name"
            isEditing={isEditing}
            className="inline-block"
          />
        </h1>
        <div className="flex flex-wrap justify-center gap-6 text-gray-600">
          {personalInfo?.email && (
            <div className="flex items-center space-x-2 px-3 py-1">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="email@example.com"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center space-x-2 px-3 py-1">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="Phone Number"
              />
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center space-x-2 px-3 py-1">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.location}
                onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="Location"
              />
            </div>
          )}
        </div>
        
        {/* Second row for web links */}
        {(personalInfo?.linkedIn || personalInfo?.portfolio) && (
          <div className="flex flex-wrap justify-center gap-6 text-gray-600 mt-4">
            {personalInfo?.linkedIn && (
              <div className="flex items-center space-x-2 px-3 py-1">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.linkedIn}
                  onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="LinkedIn Profile"
                />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center space-x-2 px-3 py-1">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Portfolio URL"
                />
              </div>
            )}
          </div>
        )}
      </header>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="no-break">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Summary
            </h2>
            <div className="text-gray-700 leading-relaxed">
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
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="section-break">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp: any, index: number) => (
                <div key={index} className="experience-item allow-break">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        <EditableText
                          value={exp.jobTitle || ''}
                          onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="Job Title"
                        />
                      </h3>
                      <p className="text-gray-700 font-semibold">
                        <EditableText
                          value={exp.company || ''}
                          onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="Company Name"
                        />
                      </p>
                    </div>
                    <div className="text-gray-600">
                      <p className="font-medium">
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
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
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
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="no-break">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-2 bg-gray-200 text-gray-800 rounded text-sm font-medium"
                >
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
                </span>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="section-break">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Projects
            </h2>
            <div className="space-y-4">
              {projects.map((project: any, index: number) => (
                <div key={index} className="project-item allow-break">
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={project.name || ''}
                      onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Project Name"
                    />
                  </h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
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
                    <p className="text-gray-600 ml-4 font-medium">
                      Technologies: {project.technologies}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="no-break">
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b border-gray-300 pb-2">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu: any, index: number) => (
                <div key={index} className="education-item no-break">
                  <div className="flex justify-between items-start">
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
                      <p className="text-gray-700 font-semibold">
                        <EditableText
                          value={edu.school || ''}
                          onSave={(value) => onUpdate?.('education', 'school', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="School Name"
                        />
                      </p>
                    </div>
                    <div className="text-gray-600">
                      <p className="font-medium">
                        <EditableText
                          value={edu.graduationDate || ''}
                          onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="Graduation Date"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;
