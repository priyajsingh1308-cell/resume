import { Mail, Phone, MapPin, Globe, Linkedin, Building } from "lucide-react";
import EditableText from "../EditableText";

interface GovernmentTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const GovernmentTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects']
}: GovernmentTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Government Header */}
      <header className="border-b-4 border-blue-800 pb-8 mb-8 no-break">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Building className="w-10 h-10 text-blue-800 mr-4" />
            <h1 className="text-4xl font-bold text-blue-900">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Government Professional"
                isEditing={isEditing}
                className="inline-block"
              />
            </h1>
          </div>
          {personalInfo?.jobTitle && (
            <p className="text-xl text-blue-700 mb-6 font-semibold">
              <EditableText
                value={personalInfo.jobTitle}
                onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="Government Position"
              />
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
            {personalInfo?.email && (
              <div className="flex items-center justify-center">
                <Mail className="w-4 h-4 mr-2" />
                <EditableText
                  value={personalInfo.email}
                  onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="email@gov.org"
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
                  className="inline-block"
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
                  className="inline-block"
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
                  className="inline-block"
                  placeholder="LinkedIn"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-800 mb-4 uppercase tracking-wide">
            Professional Summary
          </h2>
          <div className="text-gray-700 leading-relaxed bg-blue-50 p-6 rounded-lg border border-blue-200">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Public service commitment and government experience"
            />
          </div>
        </section>
      )}

      {/* Government Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-800 mb-6 uppercase tracking-wide border-b border-blue-300 pb-2">
            Government Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200 allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Government Position"
                      />
                    </h3>
                    <p className="text-blue-700 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Government Agency"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-white px-3 py-1 rounded shadow">
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
                    placeholder="Government responsibilities and public service achievements"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Clearances */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-800 mb-6 uppercase tracking-wide border-b border-blue-300 pb-2">
            Education & Clearances
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-200 no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Degree/Clearance"
                    />
                  </h3>
                  <p className="text-blue-700 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Institution"
                    />
                  </p>
                </div>
                <span className="text-gray-600 font-medium">
                  <EditableText
                    value={edu.graduationDate || ''}
                    onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Year"
                  />
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-800 mb-6 uppercase tracking-wide border-b border-blue-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center p-3 bg-blue-100 text-blue-800 rounded-lg">
                <Building className="w-4 h-4 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Government Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Government Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-800 mb-6 uppercase tracking-wide border-b border-blue-300 pb-2">
            Key Government Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200 allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Government Project"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Project scope and public impact"
                  />
                </div>
                {project.technologies && (
                  <p className="text-blue-700 mt-2 font-medium">
                    Systems/Methods: {project.technologies}
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

export default GovernmentTemplate;