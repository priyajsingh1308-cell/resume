import React, { useState, useCallback } from 'react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Download, Eye, TrendingUp, Edit, ArrowLeft, ArrowRight, GripVertical, Palette } from 'lucide-react';
import { generatePDF } from '../utils/html2pdfGenerator'; // Assuming this function is correctly implemented
import ATSScoreTab from './ats/ATSScoreTab';

// --- TEMPLATE IMPORTS ---
// (All template imports remain the same)
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import TechTemplate from './templates/TechTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import AcademicTemplate from './templates/AcademicTemplate';
import HealthcareTemplate from './templates/HealthcareTemplate';
import LegalTemplate from './templates/LegalTemplate';
import SalesTemplate from './templates/SalesTemplate';
import MarketingTemplate from './templates/MarketingTemplate';
import FinanceTemplate from './templates/FinanceTemplate';
import ConsultingTemplate from './templates/ConsultingTemplate';
import EducationTemplate from './templates/EducationTemplate';
import NonProfitTemplate from './templates/NonProfitTemplate';
import StartupTemplate from './templates/StartupTemplate';
import RetailTemplate from './templates/RetailTemplate';
import HospitalityTemplate from './templates/HospitalityTemplate';
import ManufacturingTemplate from './templates/ManufacturingTemplate';
import MediaTemplate from './templates/MediaTemplate';
import GovernmentTemplate from './templates/GovernmentTemplate';
import EngineeringTemplate from './templates/EngineeringTemplate';
import ArchitectureTemplate from './templates/ArchitectureTemplate';
import FreelancerTemplate from './templates/FreelancerTemplate';
import InternTemplate from './templates/InternTemplate';
import RemoteTemplate from './templates/RemoteTemplate';
import InternationalTemplate from './templates/InternationalTemplate';
import ScienceTemplate from './templates/ScienceTemplate';
import ArtisticTemplate from './templates/ArtisticTemplate';
import SportsTemplate from './templates/SportsTemplate';
import VeteranTemplate from './templates/VeteranTemplate';
import EntryLevelTemplate from './templates/EntryLevelTemplate';
import CareerChangeTemplate from './templates/CareerChangeTemplate';
import ExecutiveCTemplate from './templates/ExecutiveCTemplate';
import DataScienceTemplate from './templates/DataScienceTemplate';
import CybersecurityTemplate from './templates/CybersecurityTemplate';

// --- TEMPLATES ARRAY ---
const templates = [
  { id: 'modern', name: 'Modern', component: ModernTemplate, description: 'Clean and contemporary design' },
  { id: 'professional', name: 'Professional', component: ProfessionalTemplate, description: 'Two-column layout with sidebar' },
  { id: 'classic', name: 'Classic', component: ClassicTemplate, description: 'Traditional and timeless format' },
  { id: 'creative', name: 'Creative', component: CreativeTemplate, description: 'Bold and artistic layout' },
  { id: 'minimal', name: 'Minimal', component: MinimalTemplate, description: 'Simple and elegant design' },
  { id: 'executive', name: 'Executive', component: ExecutiveTemplate, description: 'Premium executive format' },
  { id: 'tech', name: 'Tech', component: TechTemplate, description: 'Developer-focused dark theme' },
  { id: 'academic', name: 'Academic', component: AcademicTemplate, description: 'Research and academia focused' },
  { id: 'healthcare', name: 'Healthcare', component: HealthcareTemplate, description: 'Medical and healthcare professionals' },
  { id: 'legal', name: 'Legal', component: LegalTemplate, description: 'Law and legal professionals' },
  { id: 'sales', name: 'Sales', component: SalesTemplate, description: 'Sales and business development' },
  { id: 'marketing', name: 'Marketing', component: MarketingTemplate, description: 'Marketing and brand professionals' },
  { id: 'finance', name: 'Finance', component: FinanceTemplate, description: 'Financial and banking sector' },
  { id: 'consulting', name: 'Consulting', component: ConsultingTemplate, description: 'Management consulting' },
  { id: 'education', name: 'Education', component: EducationTemplate, description: 'Teachers and educators' },
  { id: 'nonprofit', name: 'Non-Profit', component: NonProfitTemplate, description: 'Social impact organizations' },
  { id: 'startup', name: 'Startup', component: StartupTemplate, description: 'Entrepreneurial and startup roles' },
  { id: 'retail', name: 'Retail', component: RetailTemplate, description: 'Retail and customer service' },
  { id: 'hospitality', name: 'Hospitality', component: HospitalityTemplate, description: 'Hotels and restaurants' },
  { id: 'manufacturing', name: 'Manufacturing', component: ManufacturingTemplate, description: 'Industrial and production' },
  { id: 'media', name: 'Media', component: MediaTemplate, description: 'Creative media and entertainment' },
  { id: 'government', name: 'Government', component: GovernmentTemplate, description: 'Public sector and civil service' },
  { id: 'engineering', name: 'Engineering', component: EngineeringTemplate, description: 'Engineering professionals' },
  { id: 'architecture', name: 'Architecture', component: ArchitectureTemplate, description: 'Architects and designers' },
  { id: 'freelancer', name: 'Freelancer', component: FreelancerTemplate, description: 'Independent contractors' },
  { id: 'intern', name: 'Intern', component: InternTemplate, description: 'Students and interns' },
  { id: 'remote', name: 'Remote', component: RemoteTemplate, description: 'Remote work specialists' },
  { id: 'international', name: 'International', component: InternationalTemplate, description: 'Global professionals' },
  { id: 'science', name: 'Science', component: ScienceTemplate, description: 'Research scientists' },
  { id: 'artistic', name: 'Artistic', component: ArtisticTemplate, description: 'Artists and creatives' },
  { id: 'sports', name: 'Sports', component: SportsTemplate, description: 'Athletic professionals' },
  { id: 'veteran', name: 'Veteran', component: VeteranTemplate, description: 'Military veterans' },
  { id: 'entrylevel', name: 'Entry Level', component: EntryLevelTemplate, description: 'Recent graduates' },
  { id: 'careerchange', name: 'Career Change', component: CareerChangeTemplate, description: 'Career transition' },
  { id: 'executivec', name: 'C-Suite', component: ExecutiveCTemplate, description: 'C-level executives' },
  { id: 'datascience', name: 'Data Science', component: DataScienceTemplate, description: 'Data scientists and analysts' },
  { id: 'cybersecurity', name: 'Cybersecurity', component: CybersecurityTemplate, description: 'Security professionals' },
];

// --- INTERFACES ---
interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
    linkedin?: string;
    summary?: string;
  };
  experience: Array<any>;
  education: Array<any>;
  skills: Array<any>;
  projects?: Array<any>;
}

interface ResumePreviewProps {
  data: ResumeData;
  onUpdate: (section: string, data: any) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  isLastStep?: boolean;
  isFirstStep?: boolean;
}

// --- RESUME PREVIEW COMPONENT ---
const ResumePreview = ({ data, onUpdate, onNext, onPrevious, isLastStep, isFirstStep }: ResumePreviewProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTemplateIndex, setCurrentTemplateIndex] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [sections, setSections] = useState([
    { id: 'personalInfo', name: 'Personal Info', icon: '👤' },
    { id: 'experience', name: 'Experience', icon: '💼' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'skills', name: 'Skills', icon: '🛠️' },
    { id: 'projects', name: 'Projects', icon: '📁' }
  ]);

  const resumeData = data;

  const handleDownloadPDF = useCallback(async () => {
    try {
      await generatePDF();
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  }, []);

  const handleSaveProgress = useCallback(() => {
    try {
      const resumeState = {
        template: selectedTemplate,
        sections: sections,
        data: resumeData,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('resumeProgress', JSON.stringify(resumeState));
      
      onUpdate('saveStatus', { success: true, message: 'Progress saved successfully!' });
    } catch (error) {
      console.error('Failed to save progress:', error);
      onUpdate('saveStatus', { success: false, message: 'Failed to save progress' });
    }
  }, [selectedTemplate, sections, resumeData, onUpdate]);

  const getCurrentTemplate = useCallback(() => {
    const template = templates.find(t => t.id === selectedTemplate);
    if (!template) return null;
    
    const TemplateComponent = template.component;
    return (
      <TemplateComponent 
        data={resumeData}
        isPDFMode={true}
        isEditing={isEditMode}
        onUpdate={onUpdate}
        activeSection={activeSection}
      />
    );
  }, [selectedTemplate, resumeData, isEditMode, onUpdate, activeSection]);

  const handleTemplateChange = useCallback((templateId: string) => {
    setSelectedTemplate(templateId);
    const index = templates.findIndex(t => t.id === templateId);
    setCurrentTemplateIndex(index);
  }, []);

  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  }, [activeSection]);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', index.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault(); 
    if (draggedIndex === null || draggedIndex === index) return;

    const newSections = [...sections];
    const draggedSection = newSections[draggedIndex];
    
    newSections.splice(draggedIndex, 1);
    newSections.splice(index, 0, draggedSection);
    
    setSections(newSections);
    setDraggedIndex(index);

    onUpdate('sectionOrder', newSections.map(section => section.id));
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Main Content */}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 min-w-[320px] bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <Tabs defaultValue="template" className="flex-1 flex flex-col h-full">
          <TabsList className="grid w-full grid-cols-3 px-4 py-3 bg-gray-50 border-b border-gray-200">
            <TabsTrigger value="template" className="text-sm font-medium">
              <Palette className="w-4 h-4 mr-2" />
              Style
            </TabsTrigger>
            <TabsTrigger value="edit" className="text-sm font-medium">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="ats" className="text-sm font-medium">
              <TrendingUp className="w-4 h-4 mr-2" />
              ATS
            </TabsTrigger>
          </TabsList>

            {/* Template Selection Tab */}
            <TabsContent value="template" className="flex-1 h-full overflow-hidden">
              <div className="h-full p-4 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  {templates.map((template) => {
                    const isSelected = template.id === selectedTemplate;
                    return (
                      <div
                        key={template.id}
                        className={`cursor-pointer rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                        onClick={() => handleTemplateChange(template.id)}
                      >
                        <div className="p-3">
                          <div className="w-full aspect-[1/1.414] bg-white rounded-md mb-2 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
                            <div className="scale-[0.15] origin-top-left w-[667%] h-[667%] pointer-events-none">
                              <div className="max-w-4xl mx-auto bg-white resume-wrapper tight-spacing">
                                <template.component
                                  data={resumeData}
                                  isPDFMode={true}
                                  isEditing={false}
                                />
                              </div>
                            </div>
                          </div>
                          <h4 className="font-medium text-sm text-center text-gray-800">{template.name}</h4>
                         </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          </TabsContent>

          {/* Edit Content Tab */}
          <TabsContent value="edit" className="flex-1 h-full overflow-hidden">
            <div className="h-full p-4 space-y-4 overflow-y-auto">
              {/* Edit Mode Toggle */}
              <div className="space-y-3">
                <Button
                  variant={isEditMode ? 'default' : 'outline'}
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="w-full justify-start"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditMode ? 'Exit Edit Mode' : 'Enable Edit Mode'}
                </Button>

                {isEditMode && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800">
                      Click on any text in the resume to edit it directly.
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Edit Sections (Drag-and-Drop) */}
              <div className="space-y-2">
                <span className="text-sm font-medium text-gray-700">Reorder Sections</span>
                <div className="space-y-2">
                  {sections.map((section, index) => (
                    <div 
                      key={section.id} 
                      className={`flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1 transition-opacity ${
                        draggedIndex === index ? 'opacity-50' : 'hover:bg-gray-100'
                      }`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="cursor-move p-1 text-gray-400 hover:text-gray-600">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <Button
                        variant={activeSection === section.id ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleSectionClick(section.id)}
                        className="flex-1 justify-start text-xs font-medium"
                      >
                        <span className="mr-2">{section.icon}</span>
                        {section.name}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ATS Score Tab */}
          <TabsContent value="ats" className="flex-1 h-full overflow-hidden">
            <div className="h-full p-4 overflow-y-auto">
              <ATSScoreTab data={resumeData} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Navigation Buttons - Fixed at Bottom */}
        <div className="p-4 border-t border-gray-200 bg-white">
          {(onNext || onPrevious) && (
            <div className="flex gap-2">
              <Button 
                onClick={onPrevious} 
                disabled={isFirstStep}
                variant="outline"
                size="sm" 
                className="flex-1"
              >
                <ArrowLeft className="w-3 h-3 mr-1" />
                Previous
              </Button>
              <Button 
                onClick={onNext} 
                disabled={isLastStep}
                size="sm" 
                className="flex-1"
              >
                Next
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Resume Preview */}
      <div className="flex-1 bg-gray-100 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg min-h-[297mm] resume-wrapper tight-spacing" id="resume-content">
          {getCurrentTemplate()}
        </div>
      </div>
    </div>
  </div>
  );
};

export default ResumePreview;