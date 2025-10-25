import { Mail, Phone, MapPin, Globe, Linkedin, Coffee } from "lucide-react";
import EditableText from "../EditableText";

interface HospitalityTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const HospitalityTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: HospitalityTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Hospitality Header */}
      <header className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-8 rounded-lg mb-8 no-break">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-bold">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Hospitality Professional"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            </h1>
          </div>
          {personalInfo?.jobTitle && (
            <p className="text-xl mb-6 opacity-90 font-medium">
              <EditableText
                value={personalInfo.jobTitle}
                onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Hospitality Manager"
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
                  placeholder="email@hotel.com"
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
        </div>
      </header>

      {/* Service Philosophy */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
            <Coffee className="w-5 h-5 mr-2" />
            Service Philosophy
          </h2>
          <div className="text-gray-700 leading-relaxed bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-500">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Your commitment to exceptional guest experiences"
            />
          </div>
        </section>
      )}

      {/* Hospitality Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-yellow-600 mb-6 border-b-2 border-yellow-300 pb-2">
            Hospitality Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Hospitality Role"
                      />
                    </h3>
                    <p className="text-yellow-600 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Hotel/Restaurant"
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
                    placeholder="Guest service achievements and operational excellence"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Service Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-yellow-600 mb-6 border-b-2 border-yellow-300 pb-2">
            Service Skills & Expertise
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-3 rounded-lg">
                <Coffee className="w-4 h-4 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Hospitality Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Service Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-yellow-600 mb-6 border-b-2 border-yellow-300 pb-2">
            Service Improvement Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-yellow-50 p-6 rounded-lg border border-yellow-200 allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Service Project"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Project impact on guest satisfaction"
                  />
                </div>
                {project.technologies && (
                  <p className="text-yellow-600 mt-2 font-medium">
                    Systems/Tools: {project.technologies}
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
          <h2 className="text-xl font-bold text-yellow-600 mb-6 border-b-2 border-yellow-300 pb-2">
            Education & Certifications
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-yellow-50 p-4 rounded-lg no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Degree/Certification"
                    />
                  </h3>
                  <p className="text-yellow-600 font-semibold">
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
    </div>
  );
};

export default HospitalityTemplate;