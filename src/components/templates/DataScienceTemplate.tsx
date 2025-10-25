import { Mail, Phone, MapPin, Globe, Linkedin, BarChart3 } from "lucide-react";
import EditableText from "../EditableText";

interface DataScienceTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const DataScienceTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'skills', 'experience', 'projects', 'education']
}: DataScienceTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Data Science Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white p-8 rounded-lg mb-8 no-break">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Data Scientist"
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
                  placeholder="Data Science Professional"
                />
              </p>
            )}
          </div>
          <BarChart3 className="w-16 h-16 opacity-30" />
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
                placeholder="email@datascience.com"
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
                className="inline-block text-white"
                placeholder="Location"
              />
            </div>
          )}
          {personalInfo?.portfolio && (
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              <EditableText
                value={personalInfo.portfolio}
                onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Data Portfolio"
              />
            </div>
          )}
        </div>
      </header>

      {/* Data Science Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-700 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Data Science Profile
          </h2>
          <div className="text-gray-700 leading-relaxed bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-600">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Your data science expertise and analytical approach"
            />
          </div>
        </section>
      )}

      {/* Technical Skills - Priority for Data Science */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-600 pb-2">
            Technical Skills & Tools
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-lg text-center font-mono text-sm border border-indigo-300">
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Tech Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Data Science Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-600 pb-2">
            Data Science Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="bg-indigo-50 p-6 rounded-lg border border-indigo-200 allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Data Science Role"
                      />
                    </h3>
                    <p className="text-indigo-700 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Tech Company"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-white px-3 py-1 rounded shadow font-mono">
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
                    placeholder="Data science projects and quantifiable business impact"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Data Science Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-600 pb-2">
            Data Science Projects & Models
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
                    placeholder="Data Science Project"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Data analysis methodology and business insights"
                  />
                </div>
                {project.technologies && (
                  <div className="mt-3">
                    <p className="text-indigo-700 font-medium mb-2">Tech Stack:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech: string, i: number) => (
                        <span key={i} className="bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-xs font-mono">
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

      {/* Education */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-indigo-700 mb-6 border-b-2 border-indigo-600 pb-2">
            Education & Certifications
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-indigo-50 p-4 rounded-lg no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Data Science Degree"
                    />
                  </h3>
                  <p className="text-indigo-700 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="University/Platform"
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

export default DataScienceTemplate;