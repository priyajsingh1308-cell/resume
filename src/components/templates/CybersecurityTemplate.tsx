import { Mail, Phone, MapPin, Globe, Linkedin, Shield } from "lucide-react";
import EditableText from "../EditableText";

interface CybersecurityTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const CybersecurityTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'skills', 'experience', 'projects', 'education']
}: CybersecurityTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-gray-900 text-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Cybersecurity Header */}
      <header className="bg-gradient-to-r from-red-600 to-orange-600 p-8 rounded-lg mb-8 no-break">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Cybersecurity Expert"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-xl opacity-90 font-medium">
                <EditableText
                  value={personalInfo.jobTitle}
                  onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="Security Professional"
                />
              </p>
            )}
          </div>
          <Shield className="w-16 h-16 opacity-30" />
        </div>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="email@security.com"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Secure Phone"
              />
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.location}
                onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Location"
              />
            </div>
          )}
          {personalInfo?.linkedIn && (
            <div className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.linkedIn}
                onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="LinkedIn"
              />
            </div>
          )}
        </div>
      </header>

      {/* Security Profile */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-red-400 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Security Professional Profile
          </h2>
          <div className="text-gray-300 leading-relaxed bg-gray-800 p-6 rounded-lg border-l-4 border-red-500">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full text-gray-300"
              placeholder="Your cybersecurity expertise and threat mitigation approach"
            />
          </div>
        </section>
      )}

      {/* Security Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-red-400 mb-6 border-b-2 border-red-500 pb-2">
            Security Skills & Technologies
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="bg-gray-800 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-center font-mono text-sm">
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block text-red-300"
                  placeholder="Security Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Security Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-red-400 mb-6 border-b-2 border-red-500 pb-2">
            Cybersecurity Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block text-white"
                        placeholder="Security Position"
                      />
                    </h3>
                    <p className="text-red-400 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block text-red-400"
                        placeholder="Security Company"
                      />
                    </p>
                  </div>
                  <span className="text-gray-400 font-medium bg-gray-700 px-3 py-1 rounded font-mono">
                    <EditableText
                      value={exp.startDate || ''}
                      onSave={(value) => onUpdate?.('experience', 'startDate', value, index)}
                      isEditing={isEditing}
                      className="inline-block text-gray-400"
                      placeholder="Start"
                    />
                    {' - '}
                    {exp.current ? 'Present' : (
                      <EditableText
                        value={exp.endDate || ''}
                        onSave={(value) => onUpdate?.('experience', 'endDate', value, index)}
                        isEditing={isEditing}
                        className="inline-block text-gray-400"
                        placeholder="End"
                      />
                    )}
                  </span>
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full text-gray-300"
                    placeholder="Security implementations and threat mitigation achievements"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Security Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-red-400 mb-6 border-b-2 border-red-500 pb-2">
            Security Projects & Implementations
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-gray-800 border border-red-500 p-6 rounded-lg allow-break">
                <h3 className="text-lg font-bold text-white mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block text-white"
                    placeholder="Security Project"
                  />
                </h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full text-gray-300"
                    placeholder="Security architecture and threat prevention measures"
                  />
                </div>
                {project.technologies && (
                  <div className="mt-3">
                    <p className="text-red-400 font-medium mb-2">Security Tools:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="bg-red-900 text-red-300 px-3 py-1 rounded-full text-xs font-mono">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-red-400 mb-6 border-b-2 border-red-500 pb-2">
            Education & Security Certifications
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-gray-800 border border-gray-700 p-4 rounded-lg no-break">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block text-white"
                      placeholder="Security Certification"
                    />
                  </h3>
                  <p className="text-red-400 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block text-red-400"
                      placeholder="Certification Body"
                    />
                  </p>
                </div>
                <span className="text-gray-400 font-medium">
                  <EditableText
                    value={edu.graduationDate || ''}
                    onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                    isEditing={isEditing}
                    className="inline-block text-gray-400"
                    placeholder="Year"
                  />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CybersecurityTemplate;