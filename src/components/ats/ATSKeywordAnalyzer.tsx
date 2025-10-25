import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Plus,
  Target,
  Lightbulb,
  BarChart3,
  FileText
} from 'lucide-react';

interface ATSKeywordAnalyzerProps {
  data: any;
}

const ATSKeywordAnalyzer = ({ data }: ATSKeywordAnalyzerProps) => {
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Extract keywords from resume data
  const extractResumeKeywords = () => {
    const keywords = new Set<string>();
    
    // From skills
    if (data.skills) {
      data.skills.forEach((skill: string) => {
        keywords.add(skill.toLowerCase());
      });
    }
    
    // From experience descriptions
    if (data.experience) {
      data.experience.forEach((exp: any) => {
        if (exp.description) {
          const words = exp.description.toLowerCase().match(/\b\w+\b/g) || [];
          words.forEach((word: string) => {
            if (word.length > 3) keywords.add(word);
          });
        }
        if (exp.jobTitle) {
          const titleWords = exp.jobTitle.toLowerCase().match(/\b\w+\b/g) || [];
          titleWords.forEach((word: string) => {
            if (word.length > 3) keywords.add(word);
          });
        }
      });
    }
    
    // From summary
    if (data.personalInfo?.summary) {
      const summaryWords = data.personalInfo.summary.toLowerCase().match(/\b\w+\b/g) || [];
      summaryWords.forEach((word: string) => {
        if (word.length > 3) keywords.add(word);
      });
    }
    
    return Array.from(keywords);
  };

  // Common industry keywords by category
  const industryKeywords = {
    'Software Development': [
      'javascript', 'python', 'react', 'node.js', 'typescript', 'aws', 'docker', 'kubernetes',
      'agile', 'scrum', 'git', 'ci/cd', 'microservices', 'api', 'database', 'sql'
    ],
    'Data Science': [
      'python', 'r', 'machine learning', 'sql', 'tableau', 'pandas', 'numpy', 'tensorflow',
      'statistics', 'data analysis', 'visualization', 'big data', 'hadoop', 'spark'
    ],
    'Marketing': [
      'seo', 'sem', 'google analytics', 'social media', 'content marketing', 'email marketing',
      'conversion optimization', 'a/b testing', 'crm', 'lead generation', 'brand management'
    ],
    'Project Management': [
      'agile', 'scrum', 'kanban', 'jira', 'risk management', 'stakeholder management',
      'budget management', 'timeline management', 'team leadership', 'communication'
    ],
    'Design': [
      'figma', 'sketch', 'adobe creative suite', 'user experience', 'user interface',
      'prototyping', 'wireframing', 'design systems', 'usability testing', 'responsive design'
    ]
  };

  const analyzeKeywords = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const resumeKeywords = extractResumeKeywords();
      const jobKeywords = jobDescription.toLowerCase().match(/\b\w{3,}\b/g) || [];
      const uniqueJobKeywords = [...new Set(jobKeywords)];
      
      // Find matches and missing keywords
      const matches = resumeKeywords.filter(keyword => 
        uniqueJobKeywords.includes(keyword)
      );
      
      const missing = uniqueJobKeywords.filter(keyword => 
        !resumeKeywords.includes(keyword) && 
        keyword.length > 3 &&
        !['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'had', 'her', 'was', 'one', 'our', 'out', 'day', 'get', 'has', 'him', 'his', 'how', 'its', 'may', 'new', 'now', 'old', 'see', 'two', 'way', 'who', 'boy', 'did', 'man', 'end', 'few', 'got', 'let', 'put', 'say', 'she', 'too', 'use'].includes(keyword)
      );
      
      // Calculate match percentage
      const matchPercentage = uniqueJobKeywords.length > 0 
        ? Math.round((matches.length / uniqueJobKeywords.length) * 100)
        : 0;
      
      // Get industry suggestions based on target role
      const industrySuggestions = targetRole && industryKeywords[targetRole as keyof typeof industryKeywords] 
        ? industryKeywords[targetRole as keyof typeof industryKeywords].filter(keyword => 
            !resumeKeywords.includes(keyword)
          )
        : [];
      
      setAnalysis({
        resumeKeywords: resumeKeywords.slice(0, 20), // Limit for display
        jobKeywords: uniqueJobKeywords.slice(0, 20),
        matches,
        missing: missing.slice(0, 15), // Limit missing keywords
        matchPercentage,
        industrySuggestions: industrySuggestions.slice(0, 10)
      });
      
      setIsAnalyzing(false);
    }, 1500);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchBadge = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-100 text-green-800 border-green-200';
    if (percentage >= 50) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Keyword Analysis</h3>
        <p className="text-gray-600">
          Compare your resume keywords with job requirements to optimize for ATS systems
        </p>
      </div>

      {/* Input Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Search className="w-5 h-5" />
            Job Description Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="target-role">Target Role (Optional)</Label>
            <Input
              id="target-role"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Software Engineer, Data Scientist, Marketing Manager"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="job-description">Job Description</Label>
            <Textarea
              id="job-description"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to analyze keyword matches..."
              rows={6}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={analyzeKeywords}
            disabled={!jobDescription.trim() || isAnalyzing}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Keywords...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Analyze Keywords
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Match Score */}
          <Card className="border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold">Keyword Match Score</h3>
                </div>
                
                <div className={`text-4xl font-bold mb-2 ${getMatchColor(analysis.matchPercentage)}`}>
                  {analysis.matchPercentage}%
                </div>
                
                <Badge className={`${getMatchBadge(analysis.matchPercentage)} text-sm px-3 py-1`}>
                  {analysis.matches.length} of {analysis.jobKeywords.length} keywords matched
                </Badge>
                
                <div className="mt-4 text-sm text-gray-600">
                  {analysis.matchPercentage >= 70 ? 
                    'Excellent keyword optimization! Your resume aligns well with the job requirements.' :
                    analysis.matchPercentage >= 50 ?
                    'Good keyword coverage. Consider adding more relevant keywords to improve your score.' :
                    'Low keyword match. Adding relevant keywords could significantly improve your ATS score.'
                  }
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Matched Keywords */}
          {analysis.matches.length > 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <CheckCircle className="w-5 h-5" />
                  Matched Keywords ({analysis.matches.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {analysis.matches.map((keyword: string, index: number) => (
                    <Badge key={index} className="bg-green-100 text-green-800 border-green-200">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Missing Keywords */}
          {analysis.missing.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <AlertCircle className="w-5 h-5" />
                  Missing Keywords ({analysis.missing.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-800 mb-4">
                  Consider adding these keywords from the job description to improve your ATS score:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.missing.map((keyword: string, index: number) => (
                    <Badge key={index} className="bg-red-100 text-red-800 border-red-200 cursor-pointer hover:bg-red-200 transition-colors">
                      <Plus className="w-3 h-3 mr-1" />
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Industry Suggestions */}
          {analysis.industrySuggestions.length > 0 && (
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Lightbulb className="w-5 h-5" />
                  Industry-Specific Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-purple-800 mb-4">
                  Common keywords for {targetRole} roles that you might want to include:
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.industrySuggestions.map((keyword: string, index: number) => (
                    <Badge key={index} className="bg-purple-100 text-purple-800 border-purple-200">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Optimization Tips */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <Target className="w-5 h-5" />
                Keyword Optimization Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Include keywords naturally in your experience descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Add relevant keywords to your skills section</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Use both acronyms and full forms (e.g., "AI" and "Artificial Intelligence")</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Match the exact terminology used in the job posting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <span>Avoid keyword stuffing - use keywords contextually</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Current Resume Keywords */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Current Resume Keywords
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {extractResumeKeywords().slice(0, 30).map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-gray-700">
                {keyword}
              </Badge>
            ))}
          </div>
          {extractResumeKeywords().length > 30 && (
            <p className="text-sm text-gray-500 mt-3">
              And {extractResumeKeywords().length - 30} more keywords...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSKeywordAnalyzer;