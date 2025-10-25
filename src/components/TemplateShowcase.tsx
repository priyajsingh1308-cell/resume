import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleResumeData } from "@/data/sample-resume";
import ModernTemplate from "@/components/templates/ModernTemplate";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import TechTemplate from "@/components/templates/TechTemplate";
import AcademicTemplate from "@/components/templates/AcademicTemplate";
import HealthcareTemplate from "@/components/templates/HealthcareTemplate";
import LegalTemplate from "@/components/templates/LegalTemplate";
import SalesTemplate from "@/components/templates/SalesTemplate";
import MarketingTemplate from "@/components/templates/MarketingTemplate";
import FinanceTemplate from "@/components/templates/FinanceTemplate";
import ConsultingTemplate from "@/components/templates/ConsultingTemplate";
import EducationTemplate from "@/components/templates/EducationTemplate";
import NonProfitTemplate from "@/components/templates/NonProfitTemplate";
import StartupTemplate from "@/components/templates/StartupTemplate";
import RetailTemplate from "@/components/templates/RetailTemplate";
import HospitalityTemplate from "@/components/templates/HospitalityTemplate";
import ManufacturingTemplate from "@/components/templates/ManufacturingTemplate";
import MediaTemplate from "@/components/templates/MediaTemplate";
import GovernmentTemplate from "@/components/templates/GovernmentTemplate";
import EngineeringTemplate from "@/components/templates/EngineeringTemplate";
import ArchitectureTemplate from "@/components/templates/ArchitectureTemplate";
import FreelancerTemplate from "@/components/templates/FreelancerTemplate";
import InternTemplate from "@/components/templates/InternTemplate";
import RemoteTemplate from "@/components/templates/RemoteTemplate";
import InternationalTemplate from "@/components/templates/InternationalTemplate";
import ScienceTemplate from "@/components/templates/ScienceTemplate";
import ArtisticTemplate from "@/components/templates/ArtisticTemplate";
import SportsTemplate from "@/components/templates/SportsTemplate";
import VeteranTemplate from "@/components/templates/VeteranTemplate";
import EntryLevelTemplate from "@/components/templates/EntryLevelTemplate";
import CareerChangeTemplate from "@/components/templates/CareerChangeTemplate";
import ExecutiveCTemplate from "@/components/templates/ExecutiveCTemplate";
import DataScienceTemplate from "@/components/templates/DataScienceTemplate";
import CybersecurityTemplate from "@/components/templates/CybersecurityTemplate";
import { ProfessionalTemplate } from "@/components/templates/ProfessionalTemplate";

const TemplatePreview = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="transform scale-[0.24] origin-center">
      <div className="w-[816px] h-[1056px] bg-white shadow-md">
        {children}
      </div>
    </div>
  </div>
);

const templates = [
  {
    name: 'Modern',
    description: 'Clean and professional.',
    preview: (
      <TemplatePreview>
        <ModernTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Professional',
    description: 'Two-column sidebar layout.',
    preview: (
      <TemplatePreview>
        <ProfessionalTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Classic',
    description: 'A timeless, traditional format.',
    preview: (
      <TemplatePreview>
        <ClassicTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Creative',
    description: 'For roles where personality shines.',
    preview: (
      <TemplatePreview>
        <CreativeTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Minimal',
    description: 'Simple, clean, and elegant.',
    preview: (
      <TemplatePreview>
        <MinimalTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Executive',
    description: 'Confident and leadership-focused.',
    preview: (
      <TemplatePreview>
        <ExecutiveTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Tech',
    description: 'Perfect for developers and engineers.',
    preview: (
      <TemplatePreview>
        <TechTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Academic',
    description: 'Research and academia focused.',
    preview: (
      <TemplatePreview>
        <AcademicTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Healthcare',
    description: 'Medical professionals.',
    preview: (
      <TemplatePreview>
        <HealthcareTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Legal',
    description: 'Law and legal professionals.',
    preview: (
      <TemplatePreview>
        <LegalTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Sales',
    description: 'Sales and business development.',
    preview: (
      <TemplatePreview>
        <SalesTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Marketing',
    description: 'Marketing professionals.',
    preview: (
      <TemplatePreview>
        <MarketingTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Finance',
    description: 'Financial sector professionals.',
    preview: (
      <TemplatePreview>
        <FinanceTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Consulting',
    description: 'Management consultants.',
    preview: (
      <TemplatePreview>
        <ConsultingTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Education',
    description: 'Teachers and educators.',
    preview: (
      <TemplatePreview>
        <EducationTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Non-Profit',
    description: 'Social impact organizations.',
    preview: (
      <TemplatePreview>
        <NonProfitTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Startup',
    description: 'Entrepreneurial roles.',
    preview: (
      <TemplatePreview>
        <StartupTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Retail',
    description: 'Customer service focused.',
    preview: (
      <TemplatePreview>
        <RetailTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Hospitality',
    description: 'Hotels and restaurants.',
    preview: (
      <TemplatePreview>
        <HospitalityTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Manufacturing',
    description: 'Industrial professionals.',
    preview: (
      <TemplatePreview>
        <ManufacturingTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Media',
    description: 'Creative media professionals.',
    preview: (
      <TemplatePreview>
        <MediaTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Government',
    description: 'Public sector roles.',
    preview: (
      <TemplatePreview>
        <GovernmentTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Engineering',
    description: 'Engineering professionals.',
    preview: (
      <TemplatePreview>
        <EngineeringTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Architecture',
    description: 'Architects and designers.',
    preview: (
      <TemplatePreview>
        <ArchitectureTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Freelancer',
    description: 'Independent contractors.',
    preview: (
      <TemplatePreview>
        <FreelancerTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Intern',
    description: 'Students and interns.',
    preview: (
      <TemplatePreview>
        <InternTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Remote',
    description: 'Remote work specialists.',
    preview: (
      <TemplatePreview>
        <RemoteTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'International',
    description: 'Global professionals.',
    preview: (
      <TemplatePreview>
        <InternationalTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Science',
    description: 'Research scientists.',
    preview: (
      <TemplatePreview>
        <ScienceTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Artistic',
    description: 'Artists and creatives.',
    preview: (
      <TemplatePreview>
        <ArtisticTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Sports',
    description: 'Athletic professionals.',
    preview: (
      <TemplatePreview>
        <SportsTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Veteran',
    description: 'Military veterans.',
    preview: (
      <TemplatePreview>
        <VeteranTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Entry Level',
    description: 'Recent graduates.',
    preview: (
      <TemplatePreview>
        <EntryLevelTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Career Change',
    description: 'Career transition.',
    preview: (
      <TemplatePreview>
        <CareerChangeTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'C-Suite',
    description: 'Executive leadership.',
    preview: (
      <TemplatePreview>
        <ExecutiveCTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Data Science',
    description: 'Data professionals.',
    preview: (
      <TemplatePreview>
        <DataScienceTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
  {
    name: 'Cybersecurity',
    description: 'Security experts.',
    preview: (
      <TemplatePreview>
        <CybersecurityTemplate data={sampleResumeData} isEditing={false} />
      </TemplatePreview>
    ),
  },
];

const TemplateShowcase = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const navigate = useNavigate();

  const handleTemplateClick = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
  };

  const handleStartWithTemplate = () => {
    if (selectedTemplate) {
      navigate('/resume-builder', { state: { templateName: selectedTemplate.name } });
    }
  };

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mb-6">
            <img src="/upscalemedia-transformed.png" alt="Resume Pilot" className="w-5 h-5" />
            <span className="text-blue-700 font-medium text-sm">
              Professionally Designed Templates
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Find a Template That Helps You Soar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from 33+ professionally designed templates that help your resume take flight. 
            Each template is ATS-optimized and fully customizable to match your career journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card 
              key={template.name} 
              className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleTemplateClick(template)}
            >
              <div className="h-48 bg-gray-200 border-b border-gray-300 overflow-hidden relative">
                {template.preview}
              </div>
              <CardContent className="p-4 text-center">
                <CardTitle className="text-lg mb-1">{template.name}</CardTitle>
                <CardDescription className="text-sm">{template.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Can't find the perfect template? Our AI-powered builder adapts to any industry or role.
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Start Building Your Resume
          </Button>
        </div>
      </div>

      {/* Template Preview Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] w-full">
          <div className="relative">
            <button
              onClick={() => setSelectedTemplate(null)}
              className="absolute right-3 top-3 z-50 bg-white rounded-full p-1.5 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </button>

            {selectedTemplate && (
              <div>
                <div className="h-[600px] bg-gray-100 border-b relative overflow-hidden">
                  <div className="w-full h-full scale-100 transform flex items-center justify-center">
                    {selectedTemplate.preview}
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold mb-2">
                    {selectedTemplate.name} Template
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {selectedTemplate.description}
                  </p>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    onClick={handleStartWithTemplate}
                  >
                    Build with this template
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default TemplateShowcase;
