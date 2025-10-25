import { Mail, Phone, MapPin, Globe, Linkedin, BookOpen } from "lucide-react";
import EditableText from "../EditableText";

interface EducationTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const EducationTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'education', 'experience', 'skills', 'projects']
}: EducationTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Education Header */}
      <header className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-lg mb-8 no-break">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="w-10 h-10 mr-4" />
          <h1 className="text-4xl font-bold">
            <EditableText
              value={personalInfo?.fullName || ''}
              onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
              placeholder="Educator Name"
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
              placeholder="Education Professional"
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
                placeholder="email@school.edu"
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

      {/* Teaching Philosophy */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Teaching Philosophy & Approach
          </h2>
          <div className="text-gray-700 leading-relaxed bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Your educational philosophy and teaching approach"
            />
          </div>
        </section>
      )}

      {/* Education & Credentials */}
      {education?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
            Education & Credentials
          </h2>
          <div className="space-y-6">
            {education.map((edu: any, index: number) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg border border-blue-200 no-break">
                <div className="flex justify-between items-start mb-2">
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
                  <p className="text-blue-600 font-medium">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Teaching Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
            Teaching & Educational Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="border-l-4 border-blue-400 pl-6 allow-break">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Teaching Position"
                      />
                    </h3>
                    <p className="text-blue-600 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Educational Institution"
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
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Teaching responsibilities and student outcomes"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Teaching Skills & Methodologies */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
            Teaching Skills & Methodologies
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-4 py-3 rounded-lg">
                <BookOpen className="w-4 h-4 mr-3" />
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Teaching Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Educational Projects */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-2">
            Educational Projects & Initiatives
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
                    placeholder="Educational Project"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Project goals and educational impact"
                  />
                </div>
                {project.technologies && (
                  <p className="text-blue-600 mt-2 font-medium">
                    Tools/Methods: {project.technologies}
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

export default EducationTemplate;