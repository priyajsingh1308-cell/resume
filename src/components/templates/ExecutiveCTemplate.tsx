import { Mail, Phone, MapPin, Globe, Linkedin, Crown } from "lucide-react";
import EditableText from "../EditableText";

interface ExecutiveCTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const ExecutiveCTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: ExecutiveCTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Executive C-Suite Header */}
      <header className="border-b-8 border-gray-900 pb-8 mb-8 no-break">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-4">
              <Crown className="w-12 h-12 text-gray-900 mr-4" />
              <h1 className="text-5xl font-bold text-gray-900">
                <EditableText
                  value={personalInfo?.fullName || ''}
                  onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                  placeholder="Executive Name"
                  isEditing={isEditing}
                  className="inline-block"
                />
              </h1>
            </div>
            {personalInfo?.jobTitle && (
              <p className="text-2xl text-gray-700 mb-6 font-semibold">
                <EditableText
                  value={personalInfo.jobTitle}
                  onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Chief Executive Officer"
                />
              </p>
            )}
            <div className="space-y-3 text-gray-600">
              {personalInfo?.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4" />
                  <EditableText
                    value={personalInfo.email}
                    onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                    isEditing={isEditing}
                    className="inline-block text-lg"
                    placeholder="executive@company.com"
                  />
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4" />
                  <EditableText
                    value={personalInfo.phone}
                    onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                    isEditing={isEditing}
                    className="inline-block text-lg"
                    placeholder="Executive Phone"
                  />
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-4" />
                  <EditableText
                    value={personalInfo.location}
                    onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                    isEditing={isEditing}
                    className="inline-block text-lg"
                    placeholder="Global Headquarters"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-right space-y-3 text-gray-600">
            {personalInfo?.linkedIn && (
              <div className="flex items-center justify-end">
                <Linkedin className="w-5 h-5 mr-2" />
                <EditableText
                  value={personalInfo.linkedIn}
                  onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                  isEditing={isEditing}
                  className="inline-block text-lg"
                  placeholder="Executive LinkedIn"
                />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center justify-end">
                <Globe className="w-5 h-5 mr-2" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block text-lg"
                  placeholder="Executive Profile"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      {personalInfo?.summary && (
        <section className="mb-10 no-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
            Executive Summary
          </h2>
          <div className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-8 rounded-lg border border-gray-200">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Executive leadership philosophy and strategic vision"
            />
          </div>
        </section>
      )}

      {/* Executive Experience */}
      {experience?.length > 0 && (
        <section className="mb-10 section-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Executive Leadership Experience
          </h2>
          <div className="space-y-10">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="allow-break">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Executive Position"
                      />
                    </h3>
                    <p className="text-xl text-gray-700 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Corporation"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium text-lg bg-gray-100 px-4 py-2 rounded">
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
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line border-l-8 border-gray-900 pl-8">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Strategic leadership achievements and business transformation results"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Leadership Competencies */}
      {skills?.length > 0 && (
        <section className="mb-10 no-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Core Leadership Competencies
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="text-center p-4 bg-gray-100 rounded-lg border border-gray-300">
                <div className="text-lg font-bold text-gray-900">
                  <EditableText
                    value={skill || ''}
                    onSave={(value) => {
                      const updatedSkills = [...skills];
                      updatedSkills[index] = value;
                      onUpdate?.('skills', '', updatedSkills.join(','));
                    }}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Executive Competency"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Initiatives */}
      {projects?.length > 0 && (
        <section className="mb-10 section-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Strategic Initiatives & Transformations
          </h2>
          <div className="space-y-8">
            {projects.map((project: any, index: number) => (
              <div key={index} className="border-l-8 border-gray-900 pl-8 allow-break">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Strategic Initiative"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Strategic vision and measurable business impact"
                  />
                </div>
                {project.technologies && (
                  <p className="text-gray-600 mt-3 font-medium text-lg">
                    Key Methodologies: {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Board & Education */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide border-b-2 border-gray-900 pb-3">
            Board Positions & Executive Education
          </h2>
          <div className="space-y-6">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-6 rounded-lg no-break">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Executive Education/Board Position"
                    />
                  </h3>
                  <p className="text-gray-700 font-semibold text-lg">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Institution/Organization"
                    />
                  </p>
                </div>
                <span className="text-gray-600 font-medium text-lg">
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

export default ExecutiveCTemplate;