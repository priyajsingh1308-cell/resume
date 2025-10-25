import { Mail, Phone, MapPin, Globe, Linkedin, GraduationCap } from "lucide-react";
import EditableText from "../EditableText";

interface AcademicTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const AcademicTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'education', 'experience', 'skills', 'projects']
}: AcademicTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Academic Header */}
      <header className="text-center border-b-2 border-blue-800 pb-6 mb-8 no-break">
        <h1 className="text-3xl font-bold text-blue-900 mb-2">
          <EditableText
            value={personalInfo?.fullName || ''}
            onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
            placeholder="Your Name"
            isEditing={isEditing}
            className="inline-block"
          />
        </h1>
        {personalInfo?.jobTitle && (
          <p className="text-lg text-blue-700 mb-4 font-medium">
            <EditableText
              value={personalInfo.jobTitle}
              onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
              isEditing={isEditing}
              className="inline-block"
              placeholder="Academic Title"
            />
          </p>
        )}
        <div className="flex justify-center space-x-6 text-gray-600 text-sm">
          {personalInfo?.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="email@university.edu"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
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
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
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
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2" />
            Research Interests & Objectives
          </h2>
          <div className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Research interests and academic objectives"
            />
          </div>
        </section>
      )}

      {/* Education - Priority for Academic */}
      {education?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-900 mb-6 border-b border-blue-300 pb-2">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg no-break">
                <div className="flex justify-between items-start mb-2">
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
                {edu.gpa && (
                  <p className="text-gray-600">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-900 mb-6 border-b border-blue-300 pb-2">
            Academic & Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="allow-break">
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
                    <p className="text-blue-700 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Institution/Organization"
                      />
                    </p>
                  </div>
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
                <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Research activities and responsibilities"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-900 mb-6 border-b border-blue-300 pb-2">
            Research Skills & Competencies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects/Publications */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-900 mb-6 border-b border-blue-300 pb-2">
            Research Projects & Publications
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Research Project Title"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line ml-4">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Research methodology and findings"
                  />
                </div>
                {project.technologies && (
                  <p className="text-blue-600 mt-2 font-medium">
                    Research Methods: {project.technologies}
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

export default AcademicTemplate;