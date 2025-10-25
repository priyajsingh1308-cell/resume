
import jsPDF from 'jspdf';

// Enhanced template configurations with better spacing and layout
const templateConfigs = {
  modern: {
    colors: {
      primary: [37, 99, 235],
      secondary: [75, 85, 99],
      text: [17, 24, 39],
      accent: [59, 130, 246],
      light: [243, 244, 246],
      border: [209, 213, 219],
      background: [255, 255, 255]
    },
    fonts: {
      header: { size: 28, weight: 'bold' },
      subheader: { size: 16, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
      small: { size: 10, weight: 'normal' }
    },
    spacing: {
      section: 15,
      item: 10,
      line: 5,
      margin: 20
    }
  },
  classic: {
    colors: {
      primary: [31, 41, 55],
      secondary: [75, 85, 99],
      text: [17, 24, 39],
      accent: [107, 114, 128],
      light: [243, 244, 246],
      border: [209, 213, 219],
      background: [255, 255, 255]
    },
    fonts: {
      header: { size: 26, weight: 'bold' },
      subheader: { size: 15, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
      small: { size: 10, weight: 'normal' }
    },
    spacing: {
      section: 12,
      item: 8,
      line: 5,
      margin: 20
    }
  },
  creative: {
    colors: {
      primary: [147, 51, 234],
      secondary: [236, 72, 153],
      text: [31, 41, 55],
      accent: [168, 85, 247],
      light: [243, 232, 255],
      border: [209, 213, 219],
      background: [255, 255, 255]
    },
    fonts: {
      header: { size: 26, weight: 'bold' },
      subheader: { size: 15, weight: 'bold' },
      body: { size: 10, weight: 'normal' },
      small: { size: 9, weight: 'normal' }
    },
    spacing: {
      section: 12,
      item: 8,
      line: 4,
      margin: 20
    }
  },
  minimal: {
    colors: {
      primary: [55, 65, 81],
      secondary: [107, 114, 128],
      text: [31, 41, 55],
      accent: [107, 114, 128],
      light: [249, 250, 251],
      border: [209, 213, 219],
      background: [255, 255, 255]
    },
    fonts: {
      header: { size: 32, weight: 'normal' },
      subheader: { size: 16, weight: 'normal' },
      body: { size: 11, weight: 'normal' },
      small: { size: 10, weight: 'normal' }
    },
    spacing: {
      section: 18,
      item: 12,
      line: 6,
      margin: 25
    }
  },
  executive: {
    colors: {
      primary: [17, 24, 39],
      secondary: [55, 65, 81],
      text: [31, 41, 55],
      accent: [75, 85, 99],
      light: [243, 244, 246],
      border: [0, 0, 0],
      background: [255, 255, 255]
    },
    fonts: {
      header: { size: 30, weight: 'bold' },
      subheader: { size: 16, weight: 'bold' },
      body: { size: 11, weight: 'normal' },
      small: { size: 10, weight: 'normal' }
    },
    spacing: {
      section: 15,
      item: 10,
      line: 5,
      margin: 20
    }
  },
  tech: {
    colors: {
      primary: [34, 197, 94],
      secondary: [16, 185, 129],
      text: [255, 255, 255],
      accent: [52, 211, 153],
      light: [243, 244, 246],
      border: [209, 213, 219],
      background: [31, 41, 55]
    },
    fonts: {
      header: { size: 26, weight: 'bold' },
      subheader: { size: 15, weight: 'bold' },
      body: { size: 10, weight: 'normal' },
      small: { size: 9, weight: 'normal' }
    },
    spacing: {
      section: 12,
      item: 8,
      line: 4,
      margin: 20
    }
  }
};

export const generatePDF = async (data: any, templateName: string = 'modern') => {
  console.log('=== Enhanced PDF Generation with Perfect Layout ===');
  console.log('Template:', templateName);

  try {
    if (!data) {
      throw new Error('No resume data available for PDF generation');
    }
    
    if (!data.personalInfo?.fullName?.trim()) {
      throw new Error('Please enter your name before downloading the resume');
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      creator: 'Resume Pilot - Where Resumes Take Off',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const config = templateConfigs[templateName as keyof typeof templateConfigs] || templateConfigs.modern;
    
    let currentY = config.spacing.margin;
    const margins = { 
      left: config.spacing.margin, 
      right: config.spacing.margin, 
      top: config.spacing.margin, 
      bottom: config.spacing.margin 
    };

    // Helper functions
    const checkPageBreak = (requiredSpace: number) => {
      if (currentY + requiredSpace > pageHeight - margins.bottom) {
        pdf.addPage();
        currentY = margins.top;
        // Re-apply background for tech template
        if (templateName === 'tech') {
          setFillColor(config.colors.background);
          pdf.rect(0, 0, pageWidth, pageHeight, 'F');
        }
        return true;
      }
      return false;
    };

    const setColor = (colorArray: number[]) => {
      pdf.setTextColor(colorArray[0], colorArray[1], colorArray[2]);
    };

    const setFillColor = (colorArray: number[]) => {
      pdf.setFillColor(colorArray[0], colorArray[1], colorArray[2]);
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, color: number[], width: number = 0.5) => {
      pdf.setDrawColor(color[0], color[1], color[2]);
      pdf.setLineWidth(width);
      pdf.line(x1, y1, x2, y2);
    };

    const drawIcon = (iconType: string, x: number, y: number, size: number = 3) => {
      pdf.setDrawColor(config.colors.secondary[0], config.colors.secondary[1], config.colors.secondary[2]);
      pdf.setLineWidth(0.3);
      
      switch (iconType) {
        case 'email':
          pdf.rect(x, y - size/2, size, size * 0.7, 'S');
          pdf.line(x, y - size/2, x + size/2, y);
          pdf.line(x + size/2, y, x + size, y - size/2);
          break;
        case 'phone':
          pdf.roundedRect(x, y - size/2, size * 0.6, size, 0.5, 0.5, 'S');
          break;
        case 'location':
          pdf.circle(x + size/2, y - size/4, size/2, 'S');
          pdf.circle(x + size/2, y - size/3, size/6, 'F');
          break;
        case 'linkedin':
          pdf.rect(x, y - size/2, size, size, 'S');
          pdf.text('in', x + size/4, y + size/6);
          break;
        case 'portfolio':
          pdf.circle(x + size/2, y, size/2, 'S');
          pdf.line(x + size/4, y - size/4, x + 3*size/4, y + size/4);
          break;
      }
    };

    // Tech template background setup
    if (templateName === 'tech') {
      setFillColor(config.colors.background);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    // Enhanced header rendering with proper icon spacing
    switch (templateName) {
      case 'modern':
        // Modern template with enhanced layout
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        setColor(config.colors.text);
        pdf.text(data.personalInfo?.fullName || '', margins.left, currentY);
        currentY += 10;

        // Enhanced blue underline
        drawLine(margins.left, currentY, pageWidth - margins.right, currentY, config.colors.primary, 3);
        currentY += 12;

        // Contact info with proper icon spacing
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.secondary);
          
          const contacts = [
            { value: data.personalInfo.email, icon: 'email' },
            { value: data.personalInfo.phone, icon: 'phone' },
            { value: data.personalInfo.location, icon: 'location' },
            { value: data.personalInfo.linkedIn, icon: 'linkedin' },
            { value: data.personalInfo.portfolio, icon: 'portfolio' }
          ].filter(contact => contact.value);

          contacts.forEach((contact, index) => {
            if (index > 0 && index % 2 === 0) {
              currentY += config.spacing.line;
            }
            
            const xPos = margins.left + (index % 2) * ((pageWidth - margins.left - margins.right) / 2);
            drawIcon(contact.icon, xPos, currentY, 3);
            pdf.text(contact.value, xPos + 8, currentY);
          });
          
          currentY += config.spacing.section;
        }
        break;

      case 'classic':
        // Classic centered header with enhanced border
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        setColor(config.colors.text);
        
        const nameWidth = pdf.getTextWidth(data.personalInfo?.fullName || '');
        pdf.text(data.personalInfo?.fullName || '', (pageWidth - nameWidth) / 2, currentY);
        currentY += 10;

        // Enhanced classic border
        drawLine(margins.left, currentY, pageWidth - margins.right, currentY, config.colors.border, 2);
        currentY += 10;

        // Contact info centered with icons
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.secondary);
          
          const contacts = [
            { value: data.personalInfo.email, icon: 'email' },
            { value: data.personalInfo.phone, icon: 'phone' },
            { value: data.personalInfo.location, icon: 'location' }
          ].filter(contact => contact.value);

          contacts.forEach(contact => {
            const contactWidth = pdf.getTextWidth(contact.value);
            const startX = (pageWidth - contactWidth - 8) / 2;
            drawIcon(contact.icon, startX, currentY, 3);
            pdf.text(contact.value, startX + 8, currentY);
            currentY += config.spacing.line;
          });
          currentY += config.spacing.section;
        }
        break;

      case 'creative':
        // Creative template with enhanced gradient header
        setFillColor(config.colors.primary);
        pdf.rect(0, currentY - 10, pageWidth, 30, 'F');
        
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        pdf.setTextColor(255, 255, 255);
        pdf.text(data.personalInfo?.fullName || '', margins.left, currentY + 5);
        currentY += 25;

        // Contact info in creative grid layout
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.text);
          
          const contacts = [
            { value: data.personalInfo.email, icon: 'email' },
            { value: data.personalInfo.phone, icon: 'phone' },
            { value: data.personalInfo.location, icon: 'location' },
            { value: data.personalInfo.linkedIn, icon: 'linkedin' },
            { value: data.personalInfo.portfolio, icon: 'portfolio' }
          ].filter(contact => contact.value);

          const itemsPerRow = 3;
          contacts.forEach((contact, index) => {
            const colWidth = (pageWidth - margins.left - margins.right) / itemsPerRow;
            const x = margins.left + (index % itemsPerRow) * colWidth;
            const y = currentY + Math.floor(index / itemsPerRow) * config.spacing.line;
            
            drawIcon(contact.icon, x, y, 3);
            pdf.text(contact.value, x + 8, y);
          });
          
          currentY += Math.ceil(contacts.length / itemsPerRow) * config.spacing.line + config.spacing.section;
        }
        break;

      case 'minimal':
        // Minimal centered design with enhanced spacing
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        setColor(config.colors.text);
        
        const minimalNameWidth = pdf.getTextWidth(data.personalInfo?.fullName || '');
        pdf.text(data.personalInfo?.fullName || '', (pageWidth - minimalNameWidth) / 2, currentY);
        currentY += 20;

        // Contact info centered and elegantly spaced
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.secondary);
          
          const contacts = [
            data.personalInfo.email,
            data.personalInfo.phone,
            data.personalInfo.location
          ].filter(Boolean);

          const contactsText = contacts.join(' • ');
          const contactsWidth = pdf.getTextWidth(contactsText);
          pdf.text(contactsText, (pageWidth - contactsWidth) / 2, currentY);
          currentY += config.spacing.section;
        }
        break;

      case 'executive':
        // Executive bold header with enhanced layout
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        setColor(config.colors.primary);
        pdf.text(data.personalInfo?.fullName || '', margins.left, currentY);
        currentY += 10;

        // Thick executive line
        drawLine(margins.left, currentY, pageWidth - margins.right, currentY, config.colors.border, 4);
        currentY += 15;

        // Two-column contact layout
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.secondary);
          
          const leftContacts = [
            { value: data.personalInfo.email, icon: 'email' },
            { value: data.personalInfo.phone, icon: 'phone' }
          ].filter(contact => contact.value);

          const rightContacts = [
            { value: data.personalInfo.location, icon: 'location' },
            { value: data.personalInfo.linkedIn, icon: 'linkedin' }
          ].filter(contact => contact.value);

          let leftY = currentY;
          leftContacts.forEach(contact => {
            drawIcon(contact.icon, margins.left, leftY, 3);
            pdf.text(contact.value, margins.left + 8, leftY);
            leftY += config.spacing.line;
          });

          let rightY = currentY;
          rightContacts.forEach(contact => {
            const textWidth = pdf.getTextWidth(contact.value);
            drawIcon(contact.icon, pageWidth - margins.right - textWidth - 8, rightY, 3);
            pdf.text(contact.value, pageWidth - margins.right - textWidth, rightY);
            rightY += config.spacing.line;
          });

          currentY = Math.max(leftY, rightY) + config.spacing.section;
        }
        break;

      case 'tech':
        // Tech template with enhanced header bar
        setFillColor(config.colors.primary);
        pdf.rect(0, currentY - 10, pageWidth, 30, 'F');
        
        pdf.setFontSize(config.fonts.header.size);
        pdf.setFont('helvetica', config.fonts.header.weight);
        pdf.setTextColor(255, 255, 255);
        pdf.text(data.personalInfo?.fullName || '', margins.left, currentY + 5);
        currentY += 25;

        // Tech contact grid with enhanced spacing
        if (data.personalInfo) {
          pdf.setFontSize(config.fonts.small.size);
          setColor(config.colors.text);
          
          const contacts = [
            { value: data.personalInfo.email, icon: 'email' },
            { value: data.personalInfo.phone, icon: 'phone' },
            { value: data.personalInfo.location, icon: 'location' }
          ].filter(contact => contact.value);

          contacts.forEach((contact, index) => {
            const colWidth = (pageWidth - margins.left - margins.right) / 3;
            const x = margins.left + (index % 3) * colWidth;
            const y = currentY + Math.floor(index / 3) * config.spacing.line;
            
            drawIcon(contact.icon, x, y, 3);
            pdf.text(contact.value, x + 8, y);
          });
          
          currentY += Math.ceil(contacts.length / 3) * config.spacing.line + config.spacing.section;
        }
        break;
    }

    // Enhanced section rendering function
    const renderSection = (title: string, content: () => void) => {
      checkPageBreak(20);
      
      pdf.setFontSize(config.fonts.subheader.size);
      pdf.setFont('helvetica', config.fonts.subheader.weight);
      
      switch (templateName) {
        case 'modern':
          setColor(config.colors.primary);
          pdf.text(title, margins.left, currentY);
          currentY += 6;
          drawLine(margins.left, currentY, margins.left + 50, currentY, config.colors.primary, 2);
          currentY += 10;
          break;
        case 'creative':
          setColor(config.colors.primary);
          pdf.text(title, margins.left, currentY);
          currentY += 5;
          drawLine(margins.left, currentY, margins.left + 40, currentY, config.colors.secondary, 2);
          currentY += 8;
          break;
        case 'tech':
          setColor(config.colors.primary);
          pdf.text(title, margins.left, currentY);
          currentY += 5;
          drawLine(margins.left, currentY, margins.left + 40, currentY, config.colors.primary, 1);
          currentY += 8;
          break;
        default:
          setColor(config.colors.primary);
          pdf.text(title.toUpperCase(), margins.left, currentY);
          currentY += 5;
          drawLine(margins.left, currentY, pageWidth - margins.right, currentY, config.colors.primary, 1);
          currentY += 10;
      }
      
      content();
      currentY += config.spacing.section;
    };

    // Professional Summary with enhanced formatting
    if (data.personalInfo?.summary) {
      renderSection('PROFESSIONAL SUMMARY', () => {
        pdf.setFontSize(config.fonts.body.size);
        pdf.setFont('helvetica', config.fonts.body.weight);
        setColor(config.colors.text);
        
        const summaryLines = pdf.splitTextToSize(data.personalInfo.summary, pageWidth - margins.left - margins.right);
        summaryLines.forEach((line: string, index: number) => {
          checkPageBreak(5);
          pdf.text(line, margins.left, currentY + (index * config.spacing.line));
        });
        currentY += summaryLines.length * config.spacing.line;
      });
    }

    // Enhanced Experience Section
    if (data.experience?.length > 0) {
      renderSection('PROFESSIONAL EXPERIENCE', () => {
        data.experience.forEach((exp: any, expIndex: number) => {
          if (exp.jobTitle && exp.company) {
            checkPageBreak(25);
            
            // Timeline design for modern template
            if (templateName === 'modern') {
              setFillColor(config.colors.primary);
              pdf.circle(margins.left + 3, currentY, 2, 'F');
              
              if (expIndex < data.experience.length - 1) {
                drawLine(margins.left + 3, currentY + 3, margins.left + 3, currentY + 30, config.colors.light, 1);
              }
            }
            
            const contentX = templateName === 'modern' ? margins.left + 12 : margins.left;
            
            // Job title with enhanced formatting
            pdf.setFontSize(config.fonts.body.size + 2);
            pdf.setFont('helvetica', 'bold');
            setColor(config.colors.text);
            pdf.text(exp.jobTitle, contentX, currentY);
            currentY += 6;

            // Company and dates with better layout
            pdf.setFontSize(config.fonts.body.size);
            pdf.setFont('helvetica', 'normal');
            setColor(templateName === 'modern' ? config.colors.primary : config.colors.secondary);
            
            pdf.text(exp.company, contentX, currentY);
            
            const dateText = `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}`;
            if (dateText.trim() !== ' - ') {
              const dateWidth = pdf.getTextWidth(dateText);
              pdf.text(dateText, pageWidth - margins.right - dateWidth, currentY);
            }
            currentY += 6;

            // Enhanced description formatting
            if (exp.description) {
              pdf.setFontSize(config.fonts.body.size);
              setColor(config.colors.text);
              const descLines = pdf.splitTextToSize(exp.description, pageWidth - margins.left - margins.right - (templateName === 'modern' ? 12 : 0));
              
              descLines.forEach((line: string, index: number) => {
                checkPageBreak(5);
                pdf.text(line, contentX, currentY + (index * config.spacing.line));
              });
              currentY += descLines.length * config.spacing.line + config.spacing.item;
            }
          }
        });
      });
    }

    // Enhanced Projects Section
    if (data.projects?.length > 0) {
      renderSection('PROJECTS', () => {
        data.projects.forEach((project: any, projIndex: number) => {
          if (project.name) {
            checkPageBreak(20);
            
            // Timeline design for modern template
            if (templateName === 'modern') {
              setFillColor(config.colors.primary);
              pdf.circle(margins.left + 3, currentY, 2, 'F');
              
              if (projIndex < data.projects.length - 1) {
                drawLine(margins.left + 3, currentY + 3, margins.left + 3, currentY + 25, config.colors.light, 1);
              }
            }
            
            const contentX = templateName === 'modern' ? margins.left + 12 : margins.left;
            
            pdf.setFontSize(config.fonts.body.size + 1);
            pdf.setFont('helvetica', 'bold');
            setColor(config.colors.text);
            pdf.text(project.name, contentX, currentY);
            currentY += 6;

            if (project.description) {
              pdf.setFontSize(config.fonts.body.size);
              pdf.setFont('helvetica', 'normal');
              setColor(config.colors.text);
              const projLines = pdf.splitTextToSize(project.description, pageWidth - margins.left - margins.right - (templateName === 'modern' ? 12 : 0));
              
              projLines.forEach((line: string, index: number) => {
                checkPageBreak(5);
                pdf.text(line, contentX, currentY + (index * config.spacing.line));
              });
              currentY += projLines.length * config.spacing.line + 3;
            }

            if (project.technologies) {
              pdf.setFontSize(config.fonts.small.size);
              setColor(config.colors.secondary);
              pdf.text(`Technologies: ${project.technologies}`, contentX, currentY);
              currentY += config.spacing.item;
            }
          }
        });
      });
    }

    // Enhanced Education Section with better data handling
    if (data.education?.length > 0) {
      renderSection('EDUCATION', () => {
        data.education.forEach((edu: any, eduIndex: number) => {
          // Handle cases where degree or school might be missing
          const degree = edu.degree || 'Degree Not Specified';
          const school = edu.school || 'Institution Not Specified';
          const graduationDate = edu.graduationDate || 'Date Not Specified';
          
          checkPageBreak(15);
          
          // Timeline design for modern template
          if (templateName === 'modern') {
            setFillColor(config.colors.primary);
            pdf.circle(margins.left + 3, currentY, 2, 'F');
            
            if (eduIndex < data.education.length - 1) {
              drawLine(margins.left + 3, currentY + 3, margins.left + 3, currentY + 20, config.colors.light, 1);
            }
          }
          
          const contentX = templateName === 'modern' ? margins.left + 12 : margins.left;
          
          pdf.setFontSize(config.fonts.body.size + 1);
          pdf.setFont('helvetica', 'bold');
          setColor(config.colors.text);
          pdf.text(degree, contentX, currentY);
          currentY += 5;

          pdf.setFont('helvetica', 'normal');
          setColor(templateName === 'modern' ? config.colors.primary : config.colors.secondary);
          
          pdf.text(school, contentX, currentY);
          
          if (graduationDate !== 'Date Not Specified') {
            const gradWidth = pdf.getTextWidth(graduationDate);
            pdf.text(graduationDate, pageWidth - margins.right - gradWidth, currentY);
          }
          currentY += config.spacing.item;
        });
      });
    }

    // Enhanced Skills Section with better layout
    if (data.skills?.length > 0) {
      renderSection('SKILLS', () => {
        const validSkills = data.skills.filter((skill: string) => skill && skill.trim());
        
        if (templateName === 'creative' || templateName === 'tech') {
          // Enhanced skills badges
          pdf.setFontSize(config.fonts.small.size);
          pdf.setFont('helvetica', 'normal');
          
          let skillX = margins.left;
          let skillY = currentY;
          const maxWidth = pageWidth - margins.left - margins.right;
          
          validSkills.forEach((skill: string) => {
            const skillWidth = pdf.getTextWidth(skill) + 8;
            
            if (skillX + skillWidth > maxWidth + margins.left) {
              skillX = margins.left;
              skillY += 10;
              checkPageBreak(10);
            }
            
            // Enhanced skill background
            if (templateName === 'tech') {
              setFillColor([45, 55, 72]); // Darker background for tech
            } else {
              setFillColor(config.colors.light);
            }
            pdf.roundedRect(skillX, skillY - 4, skillWidth, 8, 2, 2, 'F');
            
            // Enhanced skill border
            pdf.setDrawColor(config.colors.primary[0], config.colors.primary[1], config.colors.primary[2]);
            pdf.setLineWidth(0.3);
            pdf.roundedRect(skillX, skillY - 4, skillWidth, 8, 2, 2, 'S');
            
            // Skill text
            setColor(config.colors.text);
            pdf.text(skill, skillX + 4, skillY + 1);
            
            skillX += skillWidth + 6;
          });
          
          currentY = skillY + 8;
        } else {
          // Enhanced bullet point layout for other templates
          const skillsText = validSkills.join(' • ');
          
          pdf.setFontSize(config.fonts.body.size);
          pdf.setFont('helvetica', 'normal');
          setColor(config.colors.text);
          
          const skillLines = pdf.splitTextToSize(skillsText, pageWidth - margins.left - margins.right);
          skillLines.forEach((line: string, index: number) => {
            checkPageBreak(5);
            pdf.text(line, margins.left, currentY + (index * config.spacing.line));
          });
          currentY += skillLines.length * config.spacing.line;
        }
      });
    }

    console.log('Enhanced PDF generation completed with perfect layout matching');
    return pdf;

  } catch (error) {
    console.error('Enhanced PDF generation error:', error);
    throw new Error('PDF generation failed: ' + (error as Error).message);
  }
};
