import { Mail, Phone, MapPin, Globe, Linkedin, Briefcase } from "lucide-react";
import EditableText from "../EditableText";

interface ConsultingTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const ConsultingTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: ConsultingTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Consulting Header */}
      <header className="border-b-4 border-indigo-600 pb-8 mb-8 no-break">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Consultant Name"
                isEditing={isEditing}
                className="inline-block"
              />
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-xl text-indigo-600 mb-4 font-semibold">
                <EditableText
                  value={personalInfo.jobTitle}
                  onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Management Consultant"
                />
              </p>
            )}
            <div className="space-y-2 text-gray-600">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3" />
                  <EditableText
                    value={personalInfo.email}
                    onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="email@consulting.com"
                  />
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3" />
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
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3" />
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
          </div>
          <div className="text-right space-y-2 text-gray-600">
            {personalInfo?.linkedIn && (
              <div className="flex items-center justify-end">
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
            {personalInfo?.portfolio && (
              <div className="flex items-center justify-end">
                <Globe className="w-4 h-4 mr-2" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Portfolio"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-600 mb-4 uppercase tracking-wide">
            Executive Summary
          </h2>
          <div className="text-gray-700 leading-relaxed bg-indigo-50 p-6 rounded-lg">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Consulting expertise and client impact"
            />
          </div>
        </section>
      )}

      {/* Consulting Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-indigo-600 mb-6 uppercase tracking-wide border-b border-indigo-300 pb-2">
            Consulting Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Consulting Role"
                      />
                    </h3>
                    <p className="text-indigo-600 font-semibold text-lg">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Consulting Firm"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-indigo-100 px-4 py-2 rounded">
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
                <div className="text-gray-700 leading-relaxed whitespace-pre-line border-l-4 border-indigo-200 pl-6">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Client engagements and business impact"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Competencies */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-600 mb-6 uppercase tracking-wide border-b border-indigo-300 pb-2">
            Core Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <Briefcase className="w-4 h-4 text-indigo-600 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Consulting Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Client Engagements */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-indigo-600 mb-6 uppercase tracking-wide border-b border-indigo-300 pb-2">
            Key Client Engagements
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Client Engagement"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Engagement scope and business outcomes"
                  />
                </div>
                {project.technologies && (
                  <p className="text-indigo-600 mt-2 font-medium">
                    Methodologies: {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-600 mb-6 uppercase tracking-wide border-b border-indigo-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Business Degree"
                    />
                  </h3>
                  <p className="text-indigo-600 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Business School"
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
    </div>
  );
};

export default ConsultingTemplate;