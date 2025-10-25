import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CircleCheck as CheckCircle, Star, Users, FileText, Brain, Sparkles, Zap, Shield, Globe, Plus, CreditCard as Edit, Eye, Download, Trash2, Calendar, Clock, TrendingUp, Award, Target, Briefcase, ChevronRight } from "lucide-react";
import ResumeBuilder from "@/components/ResumeBuilder";
import SignInModal from "@/components/auth/SignInModal";
import ResumeManager from "@/components/resume/ResumeManager";
import Header from "@/components/layout/Header";
// LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE
// import LinkedInImport from "@/components/LinkedInImport";
// import RealLinkedInImport from '@/components/linkedin/RealLinkedInImport';
// import LinkedInCallbackHandler from '@/components/linkedin/LinkedInCallbackHandler';
import { generatePDF } from "@/utils/pdfGenerator";
import { useAuth } from '@/components/auth/AuthProvider';
import { useResumes } from '@/hooks/useResumes';
import TemplateShowcase from '@/components/TemplateShowcase';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { calculateATSScore } from "@/utils/atsChecker";
import { format } from 'date-fns';

const Index = () => {
  const navigate = useNavigate();
  const [showBuilder, setShowBuilder] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  // LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE
  // const [showLinkedInImport, setShowLinkedInImport] = useState(false);
  // const [showRealLinkedInImport, setShowRealLinkedInImport] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showResumes, setShowResumes] = useState(false);
  const [importedData, setImportedData] = useState<any>(null);
  const { user, signOut, loading, session } = useAuth();
  const { resumes, loading: resumesLoading, deleteResume } = useResumes();
  // const [isImportingLinkedIn, setIsImportingLinkedIn] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);

  const handleSignIn = (email: string, password: string) => {
    // Simple mock authentication
    setIsSignedIn(true);
    setUserName(email.split('@')[0]);
    setShowSignIn(false);
    console.log('User signed in:', email);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setUserName('');
    setShowResumes(false);
  };

  const handleCreateNewResume = () => {
    setShowResumes(false);
    setImportedData(null);
    setSelectedResumeId(null);
    setShowBuilder(true);
  };

  const handleQuickStart = () => {
    // Pre-fill with basic template data for quick start
    const quickStartData = {
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: []
    };
    setImportedData(quickStartData);
    setShowBuilder(true);
  };
  // LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE
  // const handleLinkedInImport = (data: any) => {
  //   console.log('LinkedIn data imported in Index:', data);
  //   console.log('Data structure:', JSON.stringify(data, null, 2));
  //
  //   // Set the new imported data
  //   setImportedData(data);
  //   setShowLinkedInImport(false);
  //   setShowBuilder(true);
  //
  //   // Show success toast
  //   console.log('Successfully imported LinkedIn profile data');
  // };

  // const handleRealLinkedInImport = (data: any) => {
  //   console.log('Real LinkedIn data imported:', data);
  //   setImportedData(data);
  //   setShowRealLinkedInImport(false);
  //   setShowBuilder(true);
  // };

  const handleEditResume = (resume: any) => {
    // Load resume data and open builder
    setShowResumes(false);
    setImportedData(resume.resume_data);
    setSelectedResumeId(resume.id);
    setShowBuilder(true);
  };

  const handleDownloadResume = async (resume: any) => {
    try {
      const pdf = await generatePDF(resume.data);
      pdf.save(`${resume.name.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE
  // if (isImportingLinkedIn) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
  //         <p className="text-gray-600">Importing your LinkedIn profile...</p>
  //         <p className="text-sm text-gray-500 mt-2">Please wait, this may take a moment.</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (showBuilder) {
    return <ResumeBuilder 
      onBack={() => {
        setShowBuilder(false);
        setImportedData(null);
        setSelectedResumeId(null);
        // Only show resumes if user is signed in
        if (user) {
          setShowResumes(true);
        }
      }}
      initialData={importedData}
      resumeId={selectedResumeId}
    />;
  }

  if (showResumes && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
                <p className="text-gray-600">Manage and create professional resumes</p>
              </div>
              <Button onClick={handleCreateNewResume} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create New Resume
              </Button>
            </div>

            {/* Stats Cards */}
            {resumes.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{resumes.length}</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average ATS Score</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {resumes.length > 0 
                        ? Math.round(resumes.reduce((acc, resume) => acc + (resume.ats_score || 0), 0) / resumes.length)
                        : 0
                      }%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Days Until Cleanup</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {resumes.length > 0 
                        ? Math.min(...resumes.map(r => Math.ceil((new Date(r.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))))
                        : 'N/A'
                      }
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Resumes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumesLoading ? (
                <div className="col-span-full text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Loading your resumes...</p>
                </div>
              ) : resumes.length > 0 ? (
                resumes.map((resume) => {
                  // Use stored ATS score or calculate if not available
                  const atsScore = resume.ats_score || calculateATSScore(resume.resume_data).score;
                  const daysLeft = Math.ceil((new Date(resume.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  
                  const getATSBadge = (score: number) => {
                    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
                    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
                    return <Badge className="bg-red-100 text-red-800">Needs Work</Badge>;
                  };

                  const getATSColor = (score: number) => {
                    if (score >= 80) return 'text-green-600';
                    if (score >= 60) return 'text-yellow-600';
                    return 'text-red-600';
                  };
                  
                  return (
                    <Card key={resume.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{resume.title}</CardTitle>
                            <CardDescription className="capitalize">
                              {resume.template_type} Template
                            </CardDescription>
                          </div>
                          {getATSBadge(atsScore)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* ATS Score */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">ATS Score</span>
                            <span className={`text-sm font-bold ${getATSColor(atsScore)}`}>
                              {atsScore}%
                            </span>
                          </div>
                          <Progress value={atsScore} className="h-2" />
                        </div>

                        {/* Dates */}
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            Created: {format(new Date(resume.created_at), 'MMM dd, yyyy')}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Expires in: {daysLeft} days
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditResume(resume)}
                            className="flex-1"
                          >
                            <Eye className="w-3 h-3 mr-1" />
                            Open
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditResume(resume)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => deleteResume(resume.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Card className="col-span-full">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No resumes yet</h3>
                    <p className="text-muted-foreground mb-4 text-center">
                      Create your first resume to get started with professional templates and ATS optimization.
                    </p>
                    <Button onClick={handleCreateNewResume}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Resume
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE */}
      {/* <LinkedInCallbackHandler
        onImportStart={() => setIsImportingLinkedIn(true)}
        onImportSuccess={(data) => {
          setIsImportingLinkedIn(false);
          handleRealLinkedInImport(data);
        }}
        onImportError={() => {
          setIsImportingLinkedIn(false);
          setShowRealLinkedInImport(false);
        }}
      /> */}
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src="/upscalemedia-transformed.png"
                alt="Resume Pilot Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Resume Pilot
                </h1>
                <p className="text-xs text-gray-500">Where Resumes Take Off</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Button variant="ghost" onClick={() => setShowResumes(true)} className="hover:bg-blue-50 font-medium">
                    My Resumes
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/blogs')} className="hover:bg-blue-50 font-medium">
                    Blog
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/about')} className="hover:bg-blue-50 font-medium">
                    About
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/help')} className="hover:bg-blue-50 font-medium">
                    Help
                  </Button>
                  <div className="flex items-center space-x-3 ml-2 pl-4 border-l border-gray-200">
                    <span className="text-sm text-gray-600">Hi, {user.email?.split('@')[0]}</span>
                    <Button variant="outline" onClick={signOut} size="sm">
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => navigate('/about')} className="hover:bg-blue-50 font-medium">
                    About
                  </Button>
                  <Button variant="ghost" onClick={() => navigate('/help')} className="hover:bg-blue-50 font-medium">
                    Help
                  </Button>
                  <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700">
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-medium text-sm">AI-Powered Resume Creation</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                Build Your Perfect
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Resume Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Navigate your career with AI-powered resume creation. Build professional resumes from scratch with intelligent guidance that helps your resume soar.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                onClick={handleQuickStart}
              >
                <Zap className="mr-3 w-5 h-5" />
                Take Off Now
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
              {/* LINKEDIN INTEGRATION - COMMENTED OUT FOR FUTURE USE */}
              {/* <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  if (user) {
                    setShowRealLinkedInImport(true);
                  } else {
                    window.location.href = '/auth';
                  }
                }}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {user ? 'Import from LinkedIn' : 'Sign In to Import from LinkedIn'}
              </Button> */}
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">50K+</span>
                </div>
                <p className="text-sm text-gray-600">Active Users</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-2xl font-bold text-gray-900">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600">User Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">ATS</span>
                </div>
                <p className="text-sm text-gray-600">Friendly</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  <span className="text-2xl font-bold text-gray-900">100+</span>
                </div>
                <p className="text-sm text-gray-600">Countries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINKEDIN INTEGRATION SECTION - COMMENTED OUT FOR FUTURE USE */}
      {/* <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-full mb-8">
              <img src="/upscalemedia-transformed.png" alt="Resume Pilot" className="w-6 h-6" />
              <span className="text-white font-semibold">LinkedIn Integration Now Live!</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Skip the Manual Flight Plan
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Import your professional profile directly from LinkedIn in seconds. Let your career take flight with perfectly formatted resumes instantly.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-white">❌ Traditional Way</h3>
                <ul className="text-left space-y-3 text-blue-100">
                  <li>• Manually type all information</li>
                  <li>• Remember dates and details</li>
                  <li>• Format everything perfectly</li>
                  <li>• Takes 2-3 hours</li>
                </ul>
              </div>

              <div className="bg-white/20 backdrop-blur-sm p-8 rounded-2xl border-2 border-white/40">
                <h3 className="text-xl font-semibold mb-4 text-white">✅ With LinkedIn Import</h3>
                <ul className="text-left space-y-3 text-white">
                  <li>• Import in seconds</li>
                  <li>• All data automatically formatted</li>
                  <li>• Professional descriptions included</li>
                  <li>• Ready in under 10 minutes</li>
                </ul>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setShowLinkedInImport(true)}
              className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-50 shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Try LinkedIn Import Now
            </Button>
          </div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Create your professional resume in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-3xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Choose Your Path</h3>
                <p className="text-gray-600 leading-relaxed">
                  Start from scratch with our guided builder or select from professional templates tailored to your industry.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-3xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Build & Optimize</h3>
                <p className="text-gray-600 leading-relaxed">
                  Add your information with AI-powered suggestions. Get real-time ATS score feedback and optimization tips.
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-3xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Download & Apply</h3>
                <p className="text-gray-600 leading-relaxed">
                  Export your polished resume as PDF and start applying to your dream jobs with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our AI-powered platform provides all the tools and features to create, optimize, and perfect your resume for any industry.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* LINKEDIN INTEGRATION CARD - COMMENTED OUT FOR FUTURE USE */}
              {/* <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-blue-50 to-indigo-50 hover:scale-105 group">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <CardTitle className="text-2xl mb-3">LinkedIn Integration</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Import your professional information directly from LinkedIn with intelligent data extraction and automatic formatting.
                  </CardDescription>
                </CardHeader>
              </Card> */}

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-purple-50 to-indigo-50 hover:scale-105 group">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3">AI-Powered Analysis</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Get instant feedback on grammar, tone, keywords, and job-specific optimization with advanced AI technology.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-indigo-50 to-blue-50 hover:scale-105 group">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-3">Professional Templates</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    Choose from 6 modern, ATS-friendly templates with real-time editing and industry-specific formatting.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Additional Features */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Privacy Protected</h3>
                <p className="text-gray-600">Your data is secure and never shared with third parties.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-gray-600">Create professional resumes in under 10 minutes.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Global Standards</h3>
                <p className="text-gray-600">Supports international resume formats and standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E\")" }}></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of professionals who've landed their dream jobs with our AI-powered resume builder.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-10 py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                onClick={handleQuickStart}
              >
                <Sparkles className="mr-3 w-5 h-5" />
                Start From Scratch
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
              {/* LINKEDIN INTEGRATION BUTTON - COMMENTED OUT FOR FUTURE USE */}
              {/* <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-white text-foreground hover:bg-white hover:text-primary transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowLinkedInImport(true)}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Import from LinkedIn
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Template Showcase */}
      <TemplateShowcase />

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Trusted by Professionals Worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands who have successfully landed their dream jobs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "Resume Pilot helped me create a professional resume in under 15 minutes. The ATS optimization feature gave me confidence that my resume would actually be seen by recruiters."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">SJ</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">Software Engineer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "The AI writing assistant is a game-changer. It helped me articulate my accomplishments in a way that really stands out. Got three interview calls within a week!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">MC</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Michael Chen</p>
                      <p className="text-sm text-gray-600">Marketing Manager</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    "As a career changer, I needed a resume that highlighted transferable skills. The templates and guidance made it easy to present myself professionally."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold">EP</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Emily Parker</p>
                      <p className="text-sm text-gray-600">Product Designer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-teal-600 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-blue-100">Resumes Created</p>
              </div>
              <div>
                <Target className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">87%</div>
                <p className="text-blue-100">Interview Rate</p>
              </div>
              <div>
                <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">40+</div>
                <p className="text-blue-100">Industries Served</p>
              </div>
              <div>
                <Users className="w-12 h-12 mx-auto mb-4 opacity-90" />
                <div className="text-4xl font-bold mb-2">15K+</div>
                <p className="text-blue-100">Jobs Landed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <img src="/upscalemedia-transformed.png" alt="Resume Pilot" className="w-10 h-10" />
                  <span className="text-2xl font-bold">Resume Pilot</span>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Empowering professionals to create outstanding resumes with AI-powered tools. Where your career journey takes flight.
                </p>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors cursor-pointer">
                    <Globe className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleQuickStart(); }} className="text-gray-400 hover:text-white transition-colors">
                      Resume Builder
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      ATS Checker
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-white transition-colors text-left">
                      About Us
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/blogs')} className="text-gray-400 hover:text-white transition-colors text-left">
                      Blog
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigate('/help')} className="text-gray-400 hover:text-white transition-colors text-left">
                      Help Center
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-gray-400 text-sm">
                  &copy; 2025 Resume Pilot. Where Resumes Take Off. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <SignInModal
        isOpen={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSignIn={handleSignIn}
      />

      {/* LINKEDIN INTEGRATION MODALS - COMMENTED OUT FOR FUTURE USE */}
      {/* {showLinkedInImport && (
        <LinkedInImport
          onImport={handleLinkedInImport}
          onClose={() => setShowLinkedInImport(false)}
        />
      )}

      {showRealLinkedInImport && (
        <RealLinkedInImport
          onImportSuccess={handleRealLinkedInImport}
          onClose={() => setShowRealLinkedInImport(false)}
        />
      )} */}
    </div>
  );
};

export default Index;