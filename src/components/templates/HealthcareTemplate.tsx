import { Mail, Phone, MapPin, Globe, Linkedin, Heart } from "lucide-react";
import EditableText from "../EditableText";

interface HealthcareTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const HealthcareTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects']
}: HealthcareTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Healthcare Header */}
      <header className="bg-gradient-to-r from-teal-600 to-blue-600 text-white p-6 rounded-lg mb-8 no-break">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 mr-3" />
          <h1 className="text-3xl font-bold">
            <EditableText
              value={personalInfo?.fullName || ''}
              onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
              placeholder="Your Name"
              isEditing={isEditing}
              className="inline-block text-white"
            />
          </h1>
        </div>
        {personalInfo?.jobTitle && (
          <p className="text-center text-xl mb-4 opacity-90">
            <EditableText
              value={personalInfo.jobTitle}
              onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
              isEditing={isEditing}
              className="inline-block text-white"
              placeholder="Healthcare Professional Title"
            />
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center justify-center">
              <Mail className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="email@hospital.com"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Phone"
              />
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center justify-center">
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
            <div className="flex items-center justify-center">
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

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-teal-700 mb-4 border-l-4 border-teal-600 pl-4">
            Professional Summary
          </h2>
          <div className="text-gray-700 leading-relaxed bg-teal-50 p-4 rounded-lg">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Healthcare professional summary"
            />
          </div>
        </section>
      )}

      {/* Clinical Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-teal-700 mb-6 border-l-4 border-teal-600 pl-4">
            Clinical Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-2 border-teal-200 pl-6 allow-break">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Position"
                      />
                    </h3>
                    <p className="text-teal-600 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Healthcare Facility"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-teal-100 px-3 py-1 rounded">
                    <EditableText
                      value={exp.startDate || ''}
                      onSave={(value) => onUpdate?.('experience', 'startDate', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Start"
                    />
                    {' - '}
                    {exp.current ? 'Present' : (
                      <EditableText
                        value={exp.endDate || ''}
                        onSave={(value) => onUpdate?.('experience', 'endDate', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="End"
                      />
                    )}
                  </span>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Clinical responsibilities and patient care activities"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Certifications */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-teal-700 mb-6 border-l-4 border-teal-600 pl-4">
            Clinical Skills & Certifications
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center bg-teal-50 p-3 rounded-lg">
                <Heart className="w-4 h-4 text-teal-600 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Clinical Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects/Research */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-teal-700 mb-6 border-l-4 border-teal-600 pl-4">
            Research & Quality Improvement Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-teal-50 p-4 rounded-lg allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Project Title"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Project description and outcomes"
                  />
                </div>
                {project.technologies && (
                  <p className="text-teal-600 mt-2 font-medium">
                    Methods/Tools: {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default HealthcareTemplate;