import { Mail, Phone, MapPin, Globe, Linkedin, Palette } from "lucide-react";
import EditableText from "../EditableText";

interface ArtisticTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const ArtisticTemplate = ({ 
  data, 
  onUpdate, 
  isEditing = false, 
  isPDFMode = false,
  sectionOrder = ['summary', 'experience', 'skills', 'projects', 'education']
}: ArtisticTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className={`max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper ${isPDFMode ? 'tight-spacing' : ''}`}>
      {/* Artistic Header */}
      <header className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-8 rounded-2xl mb-8 overflow-hidden no-break">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative text-center">
          <div className="flex items-center justify-center mb-4">
            <Palette className="w-12 h-12 mr-4" />
            <h1 className="text-4xl font-bold">
              <EditableText
                value={personalInfo?.fullName || ''}
                onSave={(value) => onUpdate?.('personalInfo', 'fullName', value)}
                placeholder="Creative Artist"
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
                placeholder="Visual Artist"
              />
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {personalInfo?.email && (
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Mail className="w-4 h-4 mr-2" />
                <EditableText
                  value={personalInfo.email}
                  onSave={(value) => onUpdate?.('personalInfo', 'email', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="hello@artist.com"
                />
              </div>
            )}
            {personalInfo?.phone && (
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
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
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-4 h-4 mr-2" />
                <EditableText
                  value={personalInfo.location}
                  onSave={(value) => onUpdate?.('personalInfo', 'location', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="Studio Location"
                />
              </div>
            )}
            {personalInfo?.portfolio && (
              <div className="flex items-center bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                <Globe className="w-4 h-4 mr-2" />
                <EditableText
                  value={personalInfo.portfolio}
                  onSave={(value) => onUpdate?.('personalInfo', 'portfolio', value)}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="Art Portfolio"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Artistic Vision */}
      {personalInfo?.summary && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-pink-600 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Artistic Vision & Statement
          </h2>
          <div className="text-gray-700 leading-relaxed bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-6 rounded-lg border border-pink-200">
            <EditableText
              value={personalInfo.summary}
              onSave={(value) => onUpdate?.('personalInfo', 'summary', value)}
              multiline
              isEditing={isEditing}
              className="inline-block w-full"
              placeholder="Your artistic vision and creative philosophy"
            />
          </div>
        </section>
      )}

      {/* Artistic Experience */}
      {experience?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-pink-600 mb-6 border-b-2 border-pink-300 pb-2">
            Artistic Experience & Exhibitions
          </h2>
          <div className="space-y-6">
            {experience.map((exp: any, index: number) => (
              <div key={index} className="relative pl-8 allow-break">
                <div className="absolute left-0 top-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Palette className="w-3 h-3 text-white" />
                </div>
                <div className="absolute left-3 top-8 w-0.5 h-full bg-gradient-to-b from-pink-200 to-purple-200"></div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      <EditableText
                        value={exp.jobTitle || ''}
                        onSave={(value) => onUpdate?.('experience', 'jobTitle', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Artistic Role"
                      />
                    </h3>
                    <p className="text-pink-600 font-semibold">
                      <EditableText
                        value={exp.company || ''}
                        onSave={(value) => onUpdate?.('experience', 'company', value, index)}
                        isEditing={isEditing}
                        className="inline-block"
                        placeholder="Gallery/Studio/Client"
                      />
                    </p>
                  </div>
                  <span className="text-gray-600 font-medium bg-gradient-to-r from-pink-100 to-purple-100 px-3 py-1 rounded-full">
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
                    placeholder="Artistic achievements and creative contributions"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Artistic Skills */}
      {skills?.length > 0 && (
        <section className="mb-8 no-break">
          <h2 className="text-xl font-bold text-pink-600 mb-6 border-b-2 border-pink-300 pb-2">
            Artistic Skills & Mediums
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill: string, index: number) => (
              <span key={index} className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-5 py-3 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-transform">
                <EditableText
                  value={skill || ''}
                  onSave={(value) => {
                    const updatedSkills = [...skills];
                    updatedSkills[index] = value;
                    onUpdate?.('skills', '', updatedSkills.join(','));
                  }}
                  isEditing={isEditing}
                  className="inline-block text-white"
                  placeholder="Artistic Skill"
                />
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Featured Artworks */}
      {projects?.length > 0 && (
        <section className="mb-8 section-break">
          <h2 className="text-xl font-bold text-pink-600 mb-6 border-b-2 border-pink-300 pb-2">
            Featured Artworks & Projects
          </h2>
          <div className="space-y-6">
            {projects.map((project: any, index: number) => (
              <div key={index} className="bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 p-6 rounded-lg border-2 border-gradient-to-r from-pink-200 to-purple-200 allow-break">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  <EditableText
                    value={project.name || ''}
                    onSave={(value) => onUpdate?.('projects', 'name', value, index)}
                    isEditing={isEditing}
                    className="inline-block"
                    placeholder="Artwork/Project Title"
                  />
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  <EditableText
                    value={project.description || ''}
                    onSave={(value) => onUpdate?.('projects', 'description', value, index)}
                    multiline
                    isEditing={isEditing}
                    className="inline-block w-full"
                    placeholder="Artistic concept and creative process"
                  />
                </div>
                {project.technologies && (
                  <p className="text-pink-600 mt-2 font-medium">
                    Medium/Techniques: {project.technologies}
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
          <h2 className="text-xl font-bold text-pink-600 mb-6 border-b-2 border-pink-300 pb-2">
            Artistic Education & Training
          </h2>
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <div key={index} className="flex justify-between items-center bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg no-break">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    <EditableText
                      value={edu.degree || ''}
                      onSave={(value) => onUpdate?.('education', 'degree', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Art Degree"
                    />
                  </h3>
                  <p className="text-pink-600 font-semibold">
                    <EditableText
                      value={edu.school || ''}
                      onSave={(value) => onUpdate?.('education', 'school', value, index)}
                      isEditing={isEditing}
                      className="inline-block"
                      placeholder="Art School/Institution"
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

export default ArtisticTemplate;