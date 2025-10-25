
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from "lucide-react";
import EditableText from "../EditableText";


interface TechTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const TechTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: TechTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-white p-8 shadow-lg min-h-[297mm]">
      {/* Enhanced Header with Better Spacing */}
      <header className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg mb-8" style={{ pageBreakInside: 'avoid' }}>
        <h1 className="text-4xl font-bold mb-6 text-center">
          <EditableText
            value={personalInfo?.fullName || ''}
            onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
            placeholder="Your Name"
            isEditing={isEditing}
            className="inline-block text-white"
          />
        </h1>
        
        {/* Primary Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-6">
          {personalInfo?.email && (
            <div className="flex items-center justify-center space-x-3">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="email@example.com"
              />
            </div>
          )}
          {personalInfo?.phone && (
            <div className="flex items-center justify-center space-x-3">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Phone number"
              />
            </div>
          )}
          {personalInfo?.location && (
            <div className="flex items-center justify-center space-x-3">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <EditableText
                value={personalInfo.location}
                onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Location"
              />
            </div>
          )}
        </div>

        {/* Secondary Contact Information */}
        {(personalInfo?.linkedIn || personalInfo?.portfolio) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {personalInfo?.linkedIn && (
              <div className="flex items-center justify-center space-x-3">
                <Linkedin className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.linkedIn}
                  onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="LinkedIn"
                />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center justify-center space-x-3">
                <Globe className="w-4 h-4 flex-shrink-0" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="Portfolio"
                />
              </div>
            )}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Left Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Enhanced Tech Stack */}
          {skills?.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-green-400 mb-4 border-b border-green-400 pb-2">
                <span className="flex items-center space-x-2">
                  <span>{'</>'}</span>
                  <span>Tech Stack</span>
                </span>
              </h2>
              <div className="space-y-3">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="bg-gray-800 border border-green-400 px-4 py-2 rounded-lg text-sm font-mono">
                    <EditableText
                      value={skill || ''}
                      onSave={(value) => {
                        const updatedSkills = [...skills];
                        updatedSkills[index] = value;
                        onUpdate?.('skills', '', updatedSkills.join(','));
                      }}
                      isEditing={isEditing}
                      className="inline-block text-white"
                      placeholder="Skill"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Summary */}
          {personalInfo?.summary && (
            <section>
              <h2 className="text-lg font-bold text-green-400 mb-4 border-b border-green-400 pb-2">
                About
              </h2>
              <div className="text-gray-300 text-sm leading-relaxed">
                <EditableText
                  value={personalInfo.summary}
                  onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
                  multiline
                  isEditing={isEditing}
                  className="inline-block w-full text-gray-300"
                  placeholder="Summary"
                />
              </div>
            </section>
          )}
        </div>

        {/* Enhanced Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Enhanced Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-6 border-b border-green-400 pb-2">
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project: any, index: number) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                    <h3 className="font-bold text-white text-lg mb-2">
                      <EditableText
                        value={project.name || ''}
                        onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                        isEditing={isEditing}
                        className="inline-block text-white"
                        placeholder="Project Name"
                      />
                    </h3>
                    <div className="text-gray-300 text-sm mb-4 whitespace-pre-line leading-relaxed">
                      <EditableText
                        value={project.description || ''}
                        onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                        multiline
                        isEditing={isEditing}
                        className="inline-block w-full text-gray-300"
                        placeholder="Project Description"
                      />
                    </div>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech: string, i: number) => (
                          <span key={i} className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-mono">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-6 border-b border-green-400 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-grow">
                        <h3 className="font-bold text-white text-lg mb-1">
                          <EditableText
                            value={exp.jobTitle || ''}
                            onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                            isEditing={isEditing}
                            className="inline-block text-white"
                            placeholder="Job Title"
                          />
                        </h3>
                        <p className="text-green-400 font-medium">
                          <EditableText
                            value={exp.company || ''}
                            onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                            isEditing={isEditing}
                            className="inline-block text-green-400"
                            placeholder="Company Name"
                          />
                        </p>
                      </div>
                      <span className="text-gray-400 text-sm ml-4 whitespace-nowrap">
                        <EditableText
                          value={exp.startDate || ''}
                          onSave={(value) => onUpdate?.('experience', 'startDate', value, index)}
                          isEditing={isEditing}
                          className="inline-block text-gray-400"
                          placeholder="Start Date"
                        />
                        {' - '}
                        {exp.current ? 'Present' : (
                          <EditableText
                            value={exp.endDate || ''}
                            onSave={(value) => onUpdate?.('experience', 'endDate', value, index)}
                            isEditing={isEditing}
                            className="inline-block text-gray-400"
                            placeholder="End Date"
                          />
                        )}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                      <EditableText
                        value={exp.description || ''}
                        onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                        multiline
                        isEditing={isEditing}
                        className="inline-block w-full text-gray-300"
                        placeholder="Job Description"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Enhanced Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-green-400 mb-6 border-b border-green-400 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any, index: number) => (
                  <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <h3 className="font-bold text-white text-lg mb-1">
                          <EditableText
                            value={edu.degree || ''}
                            onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                            isEditing={isEditing}
                            className="inline-block text-white"
                            placeholder="Degree"
                          />
                        </h3>
                        <p className="text-green-400 font-medium">
                          <EditableText
                            value={edu.school || ''}
                            onSave={(value) => onUpdate?.('education', 'school', value, index)}
                            isEditing={isEditing}
                            className="inline-block text-green-400"
                            placeholder="School Name"
                          />
                        </p>
                      </div>
                      <p className="text-gray-400 text-sm ml-4 whitespace-nowrap">
                        <EditableText
                          value={edu.graduationDate || ''}
                          onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                          isEditing={isEditing}
                          className="inline-block text-gray-400"
                          placeholder="Graduation Date"
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechTemplate;
