
import EditableText from "../EditableText";


interface MinimalTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const MinimalTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: MinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-6 shadow-lg min-h-[297mm] font-light resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Header with Better Spacing */}
      <header className="text-center mb-4 no-break">
        <h1 className="text-4xl font-thin text-gray-900 mb-4 tracking-wide">
          <EditableText
            value={personalInfo?.fullName || ''}
            onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
            placeholder="Your Name"
            isEditing={isEditing}
            className="inline-block w-full text-center"
          />
        </h1>
        <div className="flex justify-center space-x-6 text-gray-600 text-sm flex-wrap mb-4">
          {personalInfo?.email && (
            <span className="px-2">
              <EditableText
                value={personalInfo.email}
                onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="email@example.com"
              />
            </span>
          )}
          {personalInfo?.phone && personalInfo?.email && <span>•</span>}
          {personalInfo?.phone && (
            <span className="px-2">
              <EditableText
                value={personalInfo.phone}
                onSave={(value) => onUpdate?.('personalInfo', 'phone', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="Phone number"
              />
            </span>
          )}
          {personalInfo?.location && (personalInfo?.phone || personalInfo?.email) && <span>•</span>}
          {personalInfo?.location && (
            <span className="px-2">
              <EditableText
                value={personalInfo.location}
                onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                isEditing={isEditing}
                className="inline-block"
                placeholder="City, State"
              />
            </span>
          )}
        </div>
        {(personalInfo?.linkedIn || personalInfo?.portfolio) && (
          <div className="flex justify-center space-x-6 text-gray-600 text-sm flex-wrap">
            {personalInfo?.linkedIn && (
              <span className="px-2">
                <EditableText
                  value={personalInfo.linkedIn}
                  onSave={(value) => onUpdate?.('personalInfo', 'linkedIn', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="LinkedIn URL"
                />
              </span>
            )}
            {personalInfo?.portfolio && personalInfo?.linkedIn && <span>•</span>}
            {personalInfo?.portfolio && (
              <span className="px-2">
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Portfolio URL"
                />
              </span>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {personalInfo?.summary && (
        <section className="mb-4 no-break">
          <div className="text-gray-700 leading-relaxed text-center italic">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full text-center"
              placeholder="Professional summary"
            />
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="section-break mb-4">
          <h2 className="text-2xl font-thin text-gray-900 mb-4 text-center no-break">
            EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="text-center allow-break">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  <EditableText
                    value={exp.jobTitle || ''}
                    onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                    isEditing={isEditing}
                    className="inline-block w-full text-center"
                    placeholder="Job Title"
                  />
                </h3>
                <p className="text-gray-700 font-light mb-2">
                  <EditableText
                    value={exp.company || ''}
                    onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                    isEditing={isEditing}
                    className="inline-block w-full text-center"
                    placeholder="Company Name"
                  />
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <EditableText
                    value={exp.startDate || ''}
                    onSave={(value) => onUpdate?.('experience', 'startDate', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Start Date"
                  />
                  {' - '}
                  {exp.current ? 'Present' : (
                    <EditableText
                      value={exp.endDate || ''}
                      onSave={(value) => onUpdate?.('experience', 'endDate', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="End Date"
                    />
                  )}
                </p>
                <div className="text-gray-700 leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                  <EditableText
                    value={exp.description || ''}
                    onSave={(value) => onUpdate?.('experience', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full text-center"
                    placeholder="Job description and achievements"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="section-break mb-4">
          <h2 className="text-2xl font-thin text-gray-900 mb-4 text-center no-break">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {projects.map((project: any, index: number) => (
              <div key={index} className="text-center allow-break">
                <h3 className="text-lg font-medium text-gray-900">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Project Name"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed max-w-3xl mx-auto whitespace-pre-line mb-2">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Project description"
                  />
                </div>
                {project.technologies && (
                  <p className="text-gray-600 text-sm">
                    Technologies: {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills?.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-thin text-gray-900 mb-4 text-center">
              SKILLS
            </h2>
            <div className="text-center">
              <p className="text-gray-700">
                {skills.filter(skill => skill && skill.trim()).map((skill, index) => (
                  <span key={index} className="inline-block">
                    <EditableText
                      value={skill || ''}
                      onSave={(value) => {
                        const updatedSkills = [...skills];
                        updatedSkills[skills.indexOf(skill)] = value;
                        onUpdate?.('skills', '', updatedSkills.join(','));
                      }}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Skill"
                    />
                    {index < skills.filter(s => s && s.trim()).length - 1 && ' • '}
                  </span>
                ))}
              </p>
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section className="no-break">
            <h2 className="text-2xl font-thin text-gray-900 mb-4 text-center">
              EDUCATION
            </h2>
            <div className="space-y-3 text-center">
              {education.map((edu: any, index: number) => (
                <div key={index} className="no-break">
                  <h3 className="font-medium text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Degree"
                    />
                  </h3>
                  <p className="text-gray-700 font-light">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="School Name"
                    />
                  </p>
                  <p className="text-gray-600 text-sm">
                    <EditableText
                      value={edu.graduationDate || ''}
                      onSave={(value) => onUpdate?.('education', 'graduationDate', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Graduation Date"
                    />
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
