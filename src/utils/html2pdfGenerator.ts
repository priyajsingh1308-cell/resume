import html2pdf from 'html2pdf.js';

export const generatePDF = async () => {
  const element = document.getElementById('resume-content');
  if (!element) {
    console.error('Resume content element not found');
    alert('Resume content not found. Please make sure you are on the preview page.');
    return;
  }

  console.log('Found element:', element);
  console.log('Element content:', element.innerHTML.substring(0, 200) + '...');

  // Create loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 9999; color: white; font-family: system-ui;">
      <div style="text-align: center;">
        <div style="width: 40px; height: 40px; border: 4px solid #f3f3f3; border-top: 4px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
        <div>Generating PDF...</div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </div>
  `;
  document.body.appendChild(loadingDiv);

  // Simplified and reliable PDF generation options
  const opt = {
    margin: 0.5,
    filename: `resume_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.98
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: true,
      letterRendering: true,
      allowTaint: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'in', 
      format: 'letter', 
      orientation: 'portrait'
    },
    pagebreak: { 
      mode: ['avoid-all', 'css', 'legacy']
    }
  };

  try {
    console.log('Starting PDF generation...');
    console.log('Options:', opt);
    
    // Generate the PDF
    const pdf = html2pdf().set(opt).from(element);
    await pdf.save();
    
    console.log('PDF generated successfully!');
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert(`PDF generation failed: ${error.message || 'Unknown error'}`);
  } finally {
    // Remove loading indicator
    try {
      if (loadingDiv && loadingDiv.parentNode) {
        document.body.removeChild(loadingDiv);
      }
    } catch (e) {
      console.warn('Could not remove loading indicator:', e);
    }
  }
};