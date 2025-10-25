import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Target,
  Lightbulb,
  Award,
  BarChart3,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus,
  RefreshCw
} from 'lucide-react';
import { calculateATSScore, type ATSFeedback } from '@/utils/atsChecker';
import type { ATSAnalysis } from '@/utils/atsChecker';
import ATSScoreMeter from './ATSScoreMeter';
import ATSImprovementSuggestions from './ATSImprovementSuggestions';
import ATSKeywordAnalyzer from './ATSKeywordAnalyzer';
import { useToast } from '@/hooks/use-toast';

interface ATSScoreTabProps {
  data: any;
}

const ATSScoreTab = ({ data }: ATSScoreTabProps) => {
  const [atsAnalysis, setAtsAnalysis] = useState<ATSAnalysis | null>(null);
  const [previousScore, setPreviousScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastAnalyzedData, setLastAnalyzedData] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const dataString = JSON.stringify(data);
    if (data && dataString !== lastAnalyzedData) {
      setIsAnalyzing(true);
      
      // Store previous score before updating
      if (atsAnalysis) {
        setPreviousScore(atsAnalysis.score);
      }
      
      setTimeout(() => {
        const analysis = calculateATSScore(data);
        setAtsAnalysis(analysis);
        setLastAnalyzedData(dataString);
        setIsAnalyzing(false);
        
        // Show toast notification for score changes
        if (previousScore !== null && analysis.score !== previousScore) {
          const change = analysis.score - previousScore;
          toast({
            title: change > 0 ? "ATS Score Improved!" : "ATS Score Changed",
            description: `Your score ${change > 0 ? 'increased' : 'changed'} by ${Math.abs(change)} points`,
            variant: change > 0 ? "default" : "destructive"
          });
        }
      }, 1000);
    }
  }, [data, lastAnalyzedData, atsAnalysis, previousScore, toast]);

  const handleRefreshAnalysis = () => {
    if (data) {
      setIsAnalyzing(true);
      setPreviousScore(atsAnalysis?.score || null);
      
      setTimeout(() => {
        const analysis = calculateATSScore(data);
        setAtsAnalysis(analysis);
        setIsAnalyzing(false);
        
        toast({
          title: "Analysis Refreshed",
          description: "Your ATS score has been recalculated with the latest data",
        });
      }, 1500);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800 border-green-200' };
    if (score >= 80) return { label: 'Very Good', color: 'bg-green-100 text-green-800 border-green-200' };
    if (score >= 70) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    if (score >= 60) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    if (score >= 40) return { label: 'Needs Work', color: 'bg-orange-100 text-orange-800 border-orange-200' };
    return { label: 'Poor', color: 'bg-red-100 text-red-800 border-red-200' };
  };

  const getScoreChange = () => {
    if (previousScore === null || !atsAnalysis) return null;
    const change = atsAnalysis.score - previousScore;
    if (change > 0) return { icon: ArrowUp, color: 'text-green-600', text: `+${change}` };
    if (change < 0) return { icon: ArrowDown, color: 'text-red-600', text: `${change}` };
    return { icon: Minus, color: 'text-gray-600', text: '0' };
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'contact information': return User;
      case 'skills & keywords': return Wrench;
      case 'work experience': return Briefcase;
      case 'education': return GraduationCap;
      case 'formatting & structure': return FileText;
      default: return Target;
    }
  };

  const getScorePercentage = (score: number, maxScore: number) => {
    return Math.round((score / maxScore) * 100);
  };

  // Calculate real-time statistics
  const getResumeStats = () => {
    const stats = {
      totalSections: 0,
      completedSections: 0,
      totalWords: 0,
      keywordCount: 0,
      experienceYears: 0
    };

    if (data.personalInfo?.fullName) stats.completedSections++;
    if (data.experience?.length > 0) {
      stats.completedSections++;
      stats.totalWords += data.experience.reduce((acc: number, exp: any) => 
        acc + (exp.description?.split(' ').length || 0), 0);
      
      // Calculate years of experience
      const currentYear = new Date().getFullYear();
      stats.experienceYears = data.experience.reduce((acc: number, exp: any) => {
        const startYear = exp.startDate ? parseInt(exp.startDate) : currentYear;
        const endYear = exp.current ? currentYear : (exp.endDate ? parseInt(exp.endDate) : currentYear);
        return acc + Math.max(0, endYear - startYear);
      }, 0);
    }
    if (data.education?.length > 0) stats.completedSections++;
    if (data.skills?.length > 0) {
      stats.completedSections++;
      stats.keywordCount = data.skills.length;
    }
    if (data.projects?.length > 0) stats.completedSections++;
    
    stats.totalSections = 5; // personalInfo, experience, education, skills, projects
    
    return stats;
  };
  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your resume for ATS compatibility...</p>
          <p className="text-sm text-gray-500 mt-2">Processing {Object.keys(data).length} sections...</p>
        </div>
      </div>
    );
  }

  if (!atsAnalysis) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Unable to analyze resume. Please ensure you have filled out at least your personal information and one other section.
        </AlertDescription>
      </Alert>
    );
  }

  const scoreBadge = getScoreBadge(atsAnalysis.score);
  const scoreChange = getScoreChange();
  const resumeStats = getResumeStats();

  return (
    <div className="space-y-6">
      {/* Header with Score Overview */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">ATS Flight Check</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefreshAnalysis}
            disabled={isAnalyzing}
            className="ml-4"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isAnalyzing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <p className="text-gray-600 mb-6">
          Comprehensive analysis to ensure your resume is ready for takeoff through ATS systems
        </p>
      </div>

      {/* Real-time Resume Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-blue-600">{resumeStats.completedSections}</div>
          <div className="text-xs text-gray-600">Sections Complete</div>
          <div className="text-xs text-gray-500">of {resumeStats.totalSections}</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-green-600">{resumeStats.totalWords}</div>
          <div className="text-xs text-gray-600">Total Words</div>
          <div className="text-xs text-gray-500">in descriptions</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-purple-600">{resumeStats.keywordCount}</div>
          <div className="text-xs text-gray-600">Skills Listed</div>
          <div className="text-xs text-gray-500">keywords</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-orange-600">{resumeStats.experienceYears}</div>
          <div className="text-xs text-gray-600">Years Experience</div>
          <div className="text-xs text-gray-500">calculated</div>
        </Card>
        <Card className="text-center p-4">
          <div className="text-2xl font-bold text-indigo-600">{data.experience?.length || 0}</div>
          <div className="text-xs text-gray-600">Job Positions</div>
          <div className="text-xs text-gray-500">listed</div>
        </Card>
      </div>
      {/* Score Meter Card */}
      <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-2xl">Overall ATS Score</CardTitle>
            </div>
            {scoreChange && (
              <div className={`flex items-center gap-1 ${scoreChange.color}`}>
                <scoreChange.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{scoreChange.text}</span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${scoreBadge.color} border text-lg px-4 py-2`}>
              {scoreBadge.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <ATSScoreMeter score={atsAnalysis.score} showDetails={true} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg border">
              <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">ATS Compatibility</p>
              <p className="text-lg font-bold text-gray-900">{atsAnalysis.score}%</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Strengths Found</p>
              <p className="text-lg font-bold text-gray-900">{atsAnalysis.feedback.filter(f => f.score >= 15).length}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Areas to Improve</p>
              <p className="text-lg font-bold text-gray-900">{atsAnalysis.feedback.filter(f => f.score < 15).length}</p>
            </div>
          </div>
          
          {/* Quick action buttons */}
          <div className="mt-6 flex justify-center gap-3">
            <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white">
              <Target className="w-4 h-4 mr-2" />
              View Improvements
            </Button>
            <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analyze Keywords
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="breakdown" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="breakdown">Score Breakdown</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="tips">Pro Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid gap-4">
            {atsAnalysis.feedback.map((item, index) => {
              const IconComponent = getCategoryIcon(item.category);
              const isGood = item.score >= 15;
              const isFair = item.score >= (item.maxScore * 0.6) && item.score < (item.maxScore * 0.8);
              const scorePercentage = getScorePercentage(item.score, item.maxScore);
              
              return (
                <Card key={index} className={`border-l-4 transition-all hover:shadow-md ${
                  isGood ? 'border-l-green-500 bg-green-50' : 
                  isFair ? 'border-l-yellow-500 bg-yellow-50' : 
                  'border-l-red-500 bg-red-50'
                }`}>
                  <CardContent className="p-6 relative">
                    {/* Score indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold ${
                        isGood ? 'bg-green-100 text-green-800' :
                        isFair ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        <div className="text-center">
                          <div className="text-lg font-bold">{scorePercentage}%</div>
                          <div className="text-xs">{item.score}/{item.maxScore}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-6 h-6 ${
                          isGood ? 'text-green-600' : 
                          isFair ? 'text-yellow-600' : 
                          'text-red-600'
                        }`} />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                          <p className="text-gray-600">{item.feedback}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="mb-4">
                      <Progress value={scorePercentage} className="h-2" />
                    </div>
                    
                    {item.suggestions.length > 0 && (
                      <div className="p-4 bg-white/80 rounded-lg border border-white/50">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-600" />
                          Improvement Suggestions
                        </h4>
                        <ul className="space-y-2">
                          {item.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start gap-2 p-2 rounded hover:bg-blue-50/50 transition-colors">
                              <CheckCircle className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* Show detailed breakdown if available */}
                        {item.details && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            {item.details.found.length > 0 && (
                              <div className="mb-2">
                                <h5 className="text-xs font-semibold text-green-700 mb-1">✓ Found:</h5>
                                <p className="text-xs text-green-600">{item.details.found.join(', ')}</p>
                              </div>
                            )}
                            {item.details.missing.length > 0 && (
                              <div>
                                <h5 className="text-xs font-semibold text-red-700 mb-1">✗ Missing:</h5>
                                <p className="text-xs text-red-600">{item.details.missing.join(', ')}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="improvements">
          <ATSImprovementSuggestions data={data} analysis={atsAnalysis} />
        </TabsContent>

        <TabsContent value="keywords">
          <ATSKeywordAnalyzer data={data} />
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <div className="grid gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Zap className="w-5 h-5" />
                  Quick Wins (5-10 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {atsAnalysis.recommendations.slice(0, 3).map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>{rec}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Target className="w-5 h-5" />
                  Medium Impact (15-30 minutes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {atsAnalysis.recommendations.slice(3, 6).map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>{rec}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Award className="w-5 h-5" />
                  High Impact (30+ minutes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {atsAnalysis.recommendations.slice(6, 9).map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>{rec}</div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ATSScoreTab;