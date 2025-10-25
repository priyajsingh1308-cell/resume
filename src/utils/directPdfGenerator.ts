import jsPDF from 'jspdf';

interface ResumeData {
  personalInfo: {
    fullName: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    portfolio?: string;
    summary?: string;
  };
  experience?: Array<{
    jobTitle: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    school: string;
    graduationDate: string;
    gpa?: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies?: string;
  }>;
}

export class DirectPDFGenerator {
  private pdf: jsPDF;
  private currentY: number = 25;
  private pageHeight: number = 297; // A4 height in mm
  private margin: number = 20;
  private bottomMargin: number = 25;
  private lineHeight: number = 6;
  private sectionSpacing: number = 12;
  private pageWidth: number = 210; // A4 width in mm
  private contentWidth: number = 170; // Available width for content

  constructor() {
    this.pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set default font
    this.pdf.setFont('helvetica');
  }

  private checkPageBreak(neededSpace: number = 20): boolean {
    if (this.currentY + neededSpace > this.pageHeight - this.bottomMargin) {
      this.pdf.addPage();
      this.currentY = this.margin;
      return true;
    }
    return false;
  }

  private addText(text: string, x: number, y: number, options: {
    fontSize?: number;
    fontStyle?: 'normal' | 'bold';
    maxWidth?: number;
    align?: 'left' | 'center' | 'right';
    color?: string;
  } = {}): number {
    const { fontSize = 11, fontStyle = 'normal', maxWidth = this.contentWidth, align = 'left', color = '#2d3748' } = options;
    
    this.pdf.setFontSize(fontSize);
    this.pdf.setFont('helvetica', fontStyle);
    
    // Set text color
    if (color) {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      this.pdf.setTextColor(r, g, b);
    }
    
    if (text.length === 0) return y;
    
    const lines = this.pdf.splitTextToSize(text, maxWidth);
    const textHeight = lines.length * (fontSize * 0.4);
    
    // Check if we need a page break
    const pageBreakOccurred = this.checkPageBreak(textHeight + 10);
    const actualY = pageBreakOccurred ? this.currentY : y;
    
    lines.forEach((line: string, index: number) => {
      const lineY = actualY + (index * fontSize * 0.4);
      
      if (align === 'center') {
        this.pdf.text(line, this.pageWidth / 2, lineY, { align: 'center' });
      } else if (align === 'right') {
        this.pdf.text(line, x + maxWidth, lineY, { align: 'right' });
      } else {
        this.pdf.text(line, x, lineY);
      }
    });
    
    return actualY + textHeight;
  }

  private addSection(title: string, color: string = '#2563eb'): void {
    this.checkPageBreak(20);
    
    // Add space before section
    this.currentY += this.sectionSpacing;
    
    // Section header with colored accent
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    this.pdf.setFillColor(r, g, b);
    this.pdf.rect(this.margin, this.currentY - 2, 3, 8, 'F');
    
    this.currentY = this.addText(title, this.margin + 8, this.currentY + 4, {
      fontSize: 14,
      fontStyle: 'bold',
      color: color
    });
    
    this.currentY += 6;
  }

  private renderHeader(data: ResumeData): void {
    // Name with proper spacing
    this.currentY = this.addText(data.personalInfo.fullName, 0, this.currentY + 5, {
      fontSize: 26,
      fontStyle: 'bold',
      align: 'center',
      maxWidth: this.contentWidth,
      color: '#1f2937'
    });
    
    this.currentY += 8;
    
    // Contact info in a clean format
    const contactInfo = [];
    if (data.personalInfo.email) contactInfo.push(data.personalInfo.email);
    if (data.personalInfo.phone) contactInfo.push(data.personalInfo.phone);
    if (data.personalInfo.location) contactInfo.push(data.personalInfo.location);
    if (data.personalInfo.linkedIn) contactInfo.push(data.personalInfo.linkedIn);
    if (data.personalInfo.portfolio) contactInfo.push(data.personalInfo.portfolio);
    
    if (contactInfo.length > 0) {
      this.currentY = this.addText(contactInfo.join(' • '), 0, this.currentY, {
        fontSize: 10,
        align: 'center',
        maxWidth: this.contentWidth,
        color: '#6b7280'
      });
    }
    
    // Separator line
    this.currentY += 8;
    this.pdf.setDrawColor(200, 200, 200);
    this.pdf.line(this.margin, this.currentY, this.pageWidth - this.margin, this.currentY);
    this.currentY += 5;
  }

  private renderSummary(data: ResumeData): void {
    if (!data.personalInfo.summary) return;
    
    this.addSection('Professional Summary');
    this.currentY = this.addText(data.personalInfo.summary, this.margin + 5, this.currentY, {
      fontSize: 11,
      maxWidth: this.contentWidth - 5,
      color: '#374151'
    });
    this.currentY += 5;
  }

  private renderExperience(data: ResumeData): void {
    if (!data.experience || data.experience.length === 0) return;
    
    this.addSection('Professional Experience');
    
    data.experience.forEach((exp, index) => {
      // Ensure entire experience block stays together
      const estimatedHeight = 35 + (exp.description ? 15 : 0);
      this.checkPageBreak(estimatedHeight);
      
      // Job title
      this.currentY = this.addText(exp.jobTitle, this.margin + 5, this.currentY, {
        fontSize: 13,
        fontStyle: 'bold',
        maxWidth: 120,
        color: '#1f2937'
      });
      
      // Date range (right aligned)
      const dateRange = `${exp.startDate} – ${exp.current ? 'Present' : exp.endDate || ''}`;
      this.addText(dateRange, 0, this.currentY - 5, {
        fontSize: 10,
        align: 'right',
        maxWidth: this.contentWidth,
        color: '#6b7280'
      });
      
      // Company
      this.currentY = this.addText(exp.company, this.margin + 5, this.currentY + 2, {
        fontSize: 11,
        maxWidth: this.contentWidth - 5,
        color: '#2563eb'
      });
      
      this.currentY += 4;
      
      // Description
      if (exp.description) {
        this.currentY = this.addText(exp.description, this.margin + 5, this.currentY, {
          fontSize: 10,
          maxWidth: this.contentWidth - 5,
          color: '#374151'
        });
      }
      
      if (index < data.experience.length - 1) {
        this.currentY += 10;
      }
    });
  }

  private renderSkills(data: ResumeData): void {
    if (!data.skills || data.skills.length === 0) return;
    
    this.addSection('Core Competencies');
    
    const skillsText = data.skills.join(' • ');
    this.currentY = this.addText(skillsText, this.margin + 5, this.currentY, {
      fontSize: 10,
      maxWidth: this.contentWidth - 5,
      color: '#374151'
    });
    this.currentY += 5;
  }

  private renderProjects(data: ResumeData): void {
    if (!data.projects || data.projects.length === 0) return;
    
    this.addSection('Key Projects');
    
    data.projects.forEach((project, index) => {
      // Keep project blocks together
      const estimatedHeight = 25 + (project.technologies ? 8 : 0);
      this.checkPageBreak(estimatedHeight);
      
      // Project name
      this.currentY = this.addText(project.name, this.margin + 5, this.currentY, {
        fontSize: 12,
        fontStyle: 'bold',
        maxWidth: this.contentWidth - 5,
        color: '#1f2937'
      });
      
      this.currentY += 3;
      
      // Description
      if (project.description) {
        this.currentY = this.addText(project.description, this.margin + 5, this.currentY, {
          fontSize: 10,
          maxWidth: this.contentWidth - 5,
          color: '#374151'
        });
      }
      
      // Technologies
      if (project.technologies) {
        this.currentY += 2;
        this.currentY = this.addText(`Technologies: ${project.technologies}`, this.margin + 5, this.currentY, {
          fontSize: 9,
          maxWidth: this.contentWidth - 5,
          color: '#6b7280'
        });
      }
      
      if (index < data.projects.length - 1) {
        this.currentY += 8;
      }
    });
  }

  private renderEducation(data: ResumeData): void {
    if (!data.education || data.education.length === 0) return;
    
    this.addSection('Education');
    
    data.education.forEach((edu, index) => {
      // Keep education blocks together
      this.checkPageBreak(20);
      
      // Degree
      this.currentY = this.addText(edu.degree, this.margin + 5, this.currentY, {
        fontSize: 12,
        fontStyle: 'bold',
        maxWidth: 120,
        color: '#1f2937'
      });
      
      // Graduation date (right aligned)
      this.addText(edu.graduationDate, 0, this.currentY - 4, {
        fontSize: 10,
        align: 'right',
        maxWidth: this.contentWidth,
        color: '#6b7280'
      });
      
      // School
      this.currentY = this.addText(edu.school, this.margin + 5, this.currentY + 2, {
        fontSize: 11,
        maxWidth: this.contentWidth - 5,
        color: '#2563eb'
      });
      
      // GPA if available
      if (edu.gpa) {
        this.currentY += 2;
        this.currentY = this.addText(`GPA: ${edu.gpa}`, this.margin + 5, this.currentY, {
          fontSize: 10,
          maxWidth: this.contentWidth - 5,
          color: '#6b7280'
        });
      }
      
      if (index < data.education.length - 1) {
        this.currentY += 8;
      }
    });
  }

  public generatePDF(data: ResumeData, sectionOrder: string[] = ['summary', 'experience', 'skills', 'projects', 'education']): jsPDF {
    console.log('=== Starting Enhanced PDF Generation ===');
    
    // Render header
    this.renderHeader(data);
    
    // Render sections in specified order
    sectionOrder.forEach(section => {
      switch (section) {
        case 'summary':
          this.renderSummary(data);
          break;
        case 'experience':
          this.renderExperience(data);
          break;
        case 'skills':
          this.renderSkills(data);
          break;
        case 'projects':
          this.renderProjects(data);
          break;
        case 'education':
          this.renderEducation(data);
          break;
      }
    });
    
    // Set PDF metadata
    this.pdf.setProperties({
      title: `${data.personalInfo.fullName} - Professional Resume`,
      subject: 'Professional Resume',
      author: data.personalInfo.fullName,
      creator: 'Elite Resume Builder',
      keywords: 'resume, professional, career'
    });
    
    console.log('=== Enhanced PDF Generation Complete ===');
    return this.pdf;
  }
}

export const generateDirectPDF = (data: ResumeData, sectionOrder?: string[]): jsPDF => {
  const generator = new DirectPDFGenerator();
  return generator.generatePDF(data, sectionOrder);
};
