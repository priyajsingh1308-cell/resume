import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";

interface ProfessionalTemplateProps {
  data: any;
  onUpdate?: (section: string, field: string, value: string, index?: number) => void;
  isEditing?: boolean;
  isPDFMode?: boolean;
  sectionOrder?: string[];
}

const ProfessionalTemplate = ({ data, onUpdate, isEditing = false, isPDFMode = false }: ProfessionalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data || {};

  return (
    <div className={`resume-wrapper ${isPDFMode ? 'pdf-mode' : ''} bg-white`}>
      {/* Side Panel */}
      <div className="grid grid-cols-3 min-h-[297mm]">
        {/* Left Sidebar */}
        <div className="col-span-1 bg-slate-800 text-white p-6">
          {/* Personal Info */}
          <div className="no-break mb-8">
            <div className="w-24 h-24 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold">
                {personalInfo?.fullName?.split(' ').map(n => n[0]).join('') || 'AD'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-center mb-2">
              {personalInfo?.fullName || 'Your Name'}
            </h1>
            {personalInfo?.jobTitle && (
              <p className="text-slate-300 text-center text-sm font-medium">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="no-break mb-8">
            <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-600 pb-2">
              Contact
            </h2>
            <div className="space-y-3 text-sm">
              {personalInfo?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo?.portfolio && (
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 break-all">{personalInfo.portfolio}</span>
                </div>
              )}
              {personalInfo?.linkedIn && (
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 break-all">{personalInfo.linkedIn}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="no-break mb-8">
              <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-600 pb-2">
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((skill: string, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{skill}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(dot => (
                        <div key={dot} className="w-2 h-2 rounded-full bg-slate-500"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="no-break">
              <h2 className="text-lg font-bold mb-4 text-white border-b border-slate-600 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu: any, index: number) => (
                  <div key={index}>
                    <h3 className="font-semibold text-white text-sm">
                      {edu.degree || 'Degree'}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {edu.school || 'School Name'}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {edu.graduationDate || 'Graduation Date'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="col-span-2 p-8">
          {/* Summary */}
          {personalInfo?.summary && (
            <section className="no-break mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-slate-300 pb-2">
                Professional Summary
              </h2>
              <p className="text-slate-700 leading-relaxed">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section className="no-break mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-300 pb-2">
                Professional Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="no-break relative pl-6">
                    <div className="absolute left-0 top-2 w-3 h-3 bg-slate-800 rounded-full"></div>
                    <div className="absolute left-1.5 top-5 w-0.5 h-full bg-slate-300"></div>
                    
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {exp.jobTitle || 'Job Title'}
                        </h3>
                        <p className="text-lg font-semibold text-slate-700">
                          {exp.company || 'Company Name'}
                        </p>
                      </div>
                      <span className="text-slate-600 font-medium bg-slate-100 px-3 py-1 rounded text-sm">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section className="no-break">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-300 pb-2">
                Key Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project: any, index: number) => (
                  <div key={index} className="no-break bg-slate-50 p-4 rounded-lg">
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {project.name || 'Project Name'}
                    </h3>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line mb-2">
                      {project.description}
                    </p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(',').map((tech: string, techIndex: number) => (
                          <span key={techIndex} className="px-2 py-1 bg-slate-800 text-white text-xs rounded">
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
        </div>
      </div>
    </div>
  );
};

export { ProfessionalTemplate };