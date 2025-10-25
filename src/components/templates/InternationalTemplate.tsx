import { Mail, Phone, MapPin, Globe, Linkedin, Plane } from "lucide-react";
import EditableText from "../EditableText";

interface InternationalTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const InternationalTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'education', 'skills', 'projects']
}: InternationalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* International Header */}
      <header className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-8 rounded-lg mb-8 no-break">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="International Professional"
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
                  placeholder="Global Professional"
                />
              </p>
            )}
          </div>
          <Plane className="w-16 h-16 opacity-30" />
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
                placeholder="email@global.com"
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
                placeholder="International Phone"
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
                placeholder="Global Location"
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

      {/* Global Profile */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <Plane className="w-5 h-5 mr-2" />
            Global Professional Profile
          </h2>
          <div className="text-gray-700 leading-relaxed bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Your international experience and cross-cultural expertise"
            />
          </div>
        </section>
      )}

      {/* International Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-600 pb-2">
            International Experience
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
                        placeholder="International Position"
                      />
                    </h3>
                    <p className="text-blue-700 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Global Company"
                      />
                    </p>
                    <p className="text-gray-600 text-sm flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <EditableText
                        value={exp.location || ''}
                        onSave={(value) => onUpdate?.('experience', 'location', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Country/Region"
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
                    placeholder="International achievements and cross-cultural impact"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Global Education */}
      {education?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-600 pb-2">
            Global Education
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
                      placeholder="International Degree"
                    />
                  </h3>
                  <p className="text-blue-700 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="International Institution"
                    />
                  </p>
                  <p className="text-gray-600 text-sm flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <EditableText
                      value={edu.location || ''}
                      onSave={(value) => onUpdate?.('education', 'location', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Country"
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

      {/* Global Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-600 pb-2">
            Global Skills & Languages
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg text-center font-medium border border-blue-300">
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Global Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* International Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-600 pb-2">
            International Projects
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
                    placeholder="International Project"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Global project scope and cultural impact"
                  />
                </div>
                {project.technologies && (
                  <p className="text-blue-700 mt-2 font-medium">
                    Global Tools: {project.technologies}
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

export default InternationalTemplate;