import { Mail, Phone, MapPin, Globe, Linkedin, Scale } from "lucide-react";
import EditableText from "../EditableText";

interface LegalTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const LegalTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects']
}: LegalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Legal Header */}
      <header className="text-center border-b-4 border-gray-800 pb-6 mb-8 no-break">
        <div className="flex items-center justify-center mb-4">
          <Scale className="w-8 h-8 text-gray-800 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">
            <EditableText
              value={personalInfo?.fullName || ''}
              onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
              placeholder="Attorney Name"
              isEditing={isEditing}
              className="inline-block"
            />
          </h1>
        </div>
        {personalInfo?.jobTitle && (
          <p className="text-xl text-gray-700 mb-4 font-medium">
            <EditableText
              value={personalInfo.jobTitle}
              onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
              isEditing={isEditing}
              className="inline-block"
              placeholder="Legal Title"
            />
          </p>
        )}
        <div className="flex justify-center space-x-8 text-gray-600">
          {personalInfo?.email && (
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="email@lawfirm.com"
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
                className="inline-block"
                placeholder="Phone"
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
                className="inline-block"
                placeholder="Bar Admission State"
              />
            </div>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Professional Summary
          </h2>
          <div className="text-gray-700 leading-relaxed border-l-4 border-gray-800 pl-6 bg-gray-50 p-4">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Legal professional summary"
            />
          </div>
        </section>
      )}

      {/* Legal Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-gray-800 pb-2">
            Legal Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Legal Position"
                      />
                    </h3>
                    <p className="text-gray-700 font-semibold text-lg">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Law Firm/Organization"
                      />
                    </p>
                    {exp.location && (
                      <p className="text-gray-600">
                        <EditableText
                          value={exp.location}
                          onSave={(value) => onUpdate?.('experience', 'location', value, index)}
                          isEditing={isEditing}
                          className="inline-block"
                          placeholder="Location"
                        />
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600 font-medium">
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
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-6">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Legal responsibilities and case work"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Bar Admissions */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-gray-800 pb-2">
            Education & Bar Admissions
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Law Degree"
                    />
                  </h3>
                  <p className="text-gray-700 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Law School"
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

      {/* Practice Areas & Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-gray-800 pb-2">
            Practice Areas & Legal Skills
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center p-3 border border-gray-300 rounded-lg">
                <Scale className="w-4 h-4 text-gray-600 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Legal Practice Area"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Notable Cases/Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide border-b-2 border-gray-800 pb-2">
            Notable Cases & Legal Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="border border-gray-300 p-4 rounded-lg allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Case/Project Title"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Case details and legal outcomes"
                  />
                </div>
                {project.technologies && (
                  <p className="text-gray-600 mt-2 font-medium">
                    Legal Areas: {project.technologies}
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

export default LegalTemplate;