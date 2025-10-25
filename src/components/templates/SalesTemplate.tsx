import { Mail, Phone, MapPin, Globe, Linkedin, TrendingUp } from "lucide-react";
import EditableText from "../EditableText";

interface SalesTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const SalesTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: SalesTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Sales Header */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-lg mb-8 no-break">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="w-10 h-10 mr-4" />
            <h1 className="text-4xl font-bold">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Sales Professional Name"
                isEditing={isEditing}
                className="inline-block text-white"
              />
            </h1>
          </div>
          {personalInfo?.jobTitle && (
            <p className="text-2xl mb-6 opacity-90 font-medium">
              <EditableText
                value={personalInfo.jobTitle}
                onSave={(value) => onUpdate?.('personalInfo', 'jobTitle', value)}
                isEditing={isEditing}
                className="inline-block text-white"
                placeholder="Sales Title"
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
                  placeholder="email@company.com"
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
                  placeholder="Territory"
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

      {/* Sales Summary */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-orange-600 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sales Profile
          </h2>
          <div className="text-gray-700 leading-relaxed bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Sales achievements and approach"
            />
          </div>
        </section>
      )}

      {/* Sales Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center border-b-2 border-orange-300 pb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sales Experience & Achievements
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border-l-4 border-orange-500 allow-break">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Sales Position"
                      />
                    </h3>
                    <p className="text-orange-600 font-semibold text-lg">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Company"
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
                    placeholder="Sales achievements with metrics and numbers"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sales Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center border-b-2 border-orange-300 pb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            Sales Skills & Competencies
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill: string, index: number) => (
              <div key={index} className="bg-orange-100 text-orange-800 px-4 py-3 rounded-lg text-center font-medium">
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block"
                  placeholder="Sales Skill"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sales Projects/Campaigns */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center border-b-2 border-orange-300 pb-2">
            <TrendingUp className="w-5 h-5 mr-2" />
            Key Sales Projects & Campaigns
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-orange-50 p-6 rounded-lg border border-orange-200 allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Sales Project/Campaign"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Campaign results and sales impact"
                  />
                </div>
                {project.technologies && (
                  <p className="text-orange-600 mt-2 font-medium">
                    Tools/Methods: {project.technologies}
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
          <h2 className="text-xl font-bold text-orange-600 mb-6 flex items-center border-b-2 border-orange-300 pb-2">
            Education & Training
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
                      placeholder="Degree"
                    />
                  </h3>
                  <p className="text-gray-700 font-semibold">
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

export default SalesTemplate;