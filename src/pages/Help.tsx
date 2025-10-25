import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Search, FileText, Download, Palette, Users, Shield, Mail } from 'lucide-react';
import Header from '@/components/layout/Header';

export default function Help() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll animation refs
  const animateRefs = useRef<HTMLDivElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animateRefs.current.forEach(el => el && observer.observe(el));
  }, []);

  const setRef = (el: HTMLDivElement) => {
    if (el && !animateRefs.current.includes(el)) animateRefs.current.push(el);
  };

  // Existing FAQs
  const faqs = [
    {
      category: 'Getting Started',
      icon: FileText,
      questions: [
        { question: 'How do I create my first resume?', answer: 'Click the "Create Resume" button on the dashboard. You can either import your LinkedIn profile, fill in the information manually, or choose from our demo profiles to get started quickly.' },
        { question: 'What information do I need to provide?', answer: 'You\'ll need your personal information, work experience, education, skills, and any projects or certifications you want to highlight. You can always save as draft and come back later.' },
        { question: 'Can I save multiple versions of my resume?', answer: 'Yes! You can create and save multiple resumes, each tailored for different job applications or industries. All your resumes are accessible from the dashboard.' }
      ]
    },
    {
      category: 'Templates & Design',
      icon: Palette,
      questions: [
        { question: 'How many templates are available?', answer: 'We offer 35+ professionally designed templates across various categories including Modern, Classic, Creative, Executive, and industry-specific templates for Tech, Healthcare, Finance, and more.' },
        { question: 'Can I customize the template colors and fonts?', answer: 'While our templates are professionally designed with optimal ATS compatibility, you can switch between different templates to find the one that best matches your style.' },
        { question: 'Are the templates ATS-friendly?', answer: 'Yes! All our templates are designed to be compatible with Applicant Tracking Systems (ATS) while maintaining a professional and attractive appearance.' }
      ]
    },
    {
      category: 'ATS & Optimization',
      icon: Search,
      questions: [
        { question: 'What is an ATS score?', answer: 'ATS (Applicant Tracking System) score measures how well your resume will perform when scanned by automated systems used by employers. A higher score means better compatibility.' },
        { question: 'How can I improve my ATS score?', answer: 'Use standard section headings, include relevant keywords from the job description, avoid images and complex formatting, and use our AI writing assistant to optimize your content.' },
        { question: 'What is a good ATS score?', answer: 'Generally, a score above 80 is considered excellent, 60-80 is good, and below 60 may need improvement. Our system provides specific suggestions to improve your score.' }
      ]
    },
    {
      category: 'Exporting & Downloading',
      icon: Download,
      questions: [
        { question: 'How do I download my resume?', answer: 'Click the "Download PDF" button in the preview section. Your resume will be generated as a high-quality PDF file that you can save and share.' },
        { question: 'Can I download my resume in different formats?', answer: 'Currently, we support PDF format, which is the industry standard for resume submissions and is compatible with all ATS systems.' },
        { question: 'Is there a limit to how many times I can download?', answer: 'No limits! You can download your resume as many times as you need, and you can make updates and download new versions anytime.' }
      ]
    },
    {
      category: 'Account & Privacy',
      icon: Shield,
      questions: [
        { question: 'Is my data secure?', answer: 'Yes! We use industry-standard encryption to protect your data. Your information is stored securely and is never shared with third parties without your consent.' },
        { question: 'How long is my data stored?', answer: 'Your profile data is stored as long as your account is active. Resume drafts are stored for 7 days unless you save them permanently to your account.' },
        { question: 'Can I delete my account?', answer: 'Yes, you can delete your account at any time from the settings page. This will permanently remove all your data from our servers.' }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero/Search Section */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Help Center</h1>
          <p className="text-gray-600 text-center mb-6">Find answers to common questions</p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section ref={setRef} className="container mx-auto px-4 py-12 opacity-0 translate-y-10 transition-all duration-700">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {(searchQuery ? filteredFaqs : faqs).map(category => {
            const IconComponent = category.icon;
            return (
              <Card key={category.category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg md:text-xl font-semibold">{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium hover:text-blue-600 transition-colors">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-gray-600">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Still Need Help Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
    
    {/* Header */}
    <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-8 flex items-center gap-4">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-500 text-3xl">
        <Mail className="h-8 w-8" />
      </div>
      <div>
        <h2 className="text-2xl font-bold">Still Need Help?</h2>
        <p className="text-blue-100 mt-1">
          Fill out the form and our support team will respond within 24 hours.
        </p>
      </div>
    </div>

    {/* Form */}
    <form
      onSubmit={(e) => {
        e.preventDefault();
        alert('Form submitted!');
      }}
      className="p-8 flex flex-col gap-6"
    >
      {/* Name Input */}
      <div className="relative w-full">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-transparent peer transition"
        />
        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-blue-500 peer-focus:text-sm">
          Your Name
        </label>
      </div>

      {/* Email Input */}
      <div className="relative w-full">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full px-4 py-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-transparent peer transition"
        />
        <label className="absolute left-4 top-4 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-blue-500 peer-focus:text-sm">
          Your Email
        </label>
      </div>

      {/* Message Textarea */}
      <div className="relative w-full">
        <textarea
          name="message"
          placeholder="Your Message"
          required
          className="w-full px-4 pt-6 pb-4 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none h-36 placeholder-transparent peer transition"
        />
        <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-blue-500 peer-focus:text-sm">
          Your Message
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all shadow-md hover:shadow-lg"
      >
        Send Message
      </button>
    </form>

    {/* Optional Footer Buttons */}
    <div className="flex flex-col md:flex-row justify-center gap-4 p-8 bg-gray-50 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={() => navigate('/about')}
        className="flex-1 text-blue-500 hover:bg-blue-50"
      >
        Learn About Us
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate('/blogs')}
        className="flex-1 text-blue-500 hover:bg-blue-50"
      >
        Read Our Blog
      </Button>
    </div>
  </div>
</section>




      {/* Feature Cards */}
      <div ref={setRef} className="mt-12 grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto opacity-0 translate-y-10 transition-all duration-700">
        <FeatureCard icon={<Users className="h-8 w-8 text-blue-600" />} title="Community" description="Join thousands of users creating professional resumes" />
        <FeatureCard icon={<FileText className="h-8 w-8 text-green-600" />} title="35+ Templates" description="Choose from our extensive template library" />
        <FeatureCard icon={<Shield className="h-8 w-8 text-orange-600" />} title="Secure & Private" description="Your data is encrypted and protected" />
      </div>
    </div>
  );
}

// Reusable Feature Card
function FeatureCard({ icon, title, description }: any) {
  return (
    <Card className="text-center p-6 hover:scale-105 hover:shadow-lg transition-transform duration-300">
      <CardContent className="pt-4">
        <div className="mb-3">{icon}</div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}
