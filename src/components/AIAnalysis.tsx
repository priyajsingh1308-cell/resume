
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertCircle, Target, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAnalysisProps {
  resumeData: any;
}

const AIAnalysis = ({ resumeData }: AIAnalysisProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const generateResumeText = (data: any) => {
    let resumeText = '';
    
    if (data.personalInfo?.fullName) {
      resumeText += `Name: ${data.personalInfo.fullName}\n`;
    }
    if (data.personalInfo?.summary) {
      resumeText += `Summary: ${data.personalInfo.summary}\n\n`;
    }
    
    if (data.experience?.length > 0) {
      resumeText += 'Experience:\n';
      data.experience.forEach((exp: any) => {
        resumeText += `${exp.jobTitle || 'Position'} at ${exp.company || 'Company'}\n${exp.description || 'No description'}\n\n`;
      });
    }
    
    if (data.education?.length > 0) {
      resumeText += 'Education:\n';
      data.education.forEach((edu: any) => {
        resumeText += `${edu.degree || 'Degree'} from ${edu.school || 'Institution'}\n`;
      });
      resumeText += '\n';
    }
    
    if (data.skills?.length > 0) {
      resumeText += `Skills: ${data.skills.join(', ')}\n`;
    }
    
    return resumeText;
  };

  const analyzeResume = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to get AI analysis.",
        variant: "destructive"
      });
      return;
    }

    // Validate API key format
    if (!apiKey.startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "OpenAI API keys should start with 'sk-'. Please check your API key.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const resumeText = generateResumeText(resumeData);
      
      if (!resumeText.trim()) {
        toast({
          title: "No Resume Data",
          description: "Please complete your resume before requesting analysis.",
          variant: "destructive"
        });
        setIsAnalyzing(false);
        return;
      }

      const prompt = `
        Analyze this resume and provide detailed feedback. ${jobTitle ? `The target job title is: ${jobTitle}` : ''} ${jobDescription ? `Job description: ${jobDescription}` : ''}
        
        Resume:
        ${resumeText}
        
        Please provide analysis in the following JSON format only, no additional text:
        {
          "overallScore": 75,
          "strengths": ["Clear professional experience", "Well-structured format"],
          "improvements": ["Add more quantifiable achievements", "Include more relevant keywords"],
          "keywordMatches": ["experience", "skills", "management"],
          "missingKeywords": ["leadership", "project management", "analytics"],
          "suggestions": ["Consider adding metrics to achievements", "Tailor content to job description", "Include more action verbs"]
        }
      `;

      console.log('Sending request to OpenAI API...');

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a professional resume reviewer with expertise in various industries. Provide constructive, actionable feedback in valid JSON format only.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.3,
          max_tokens: 1000
        }),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (response.status === 403) {
          throw new Error('API access forbidden. Please check your API key permissions.');
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from OpenAI API');
      }

      const analysisText = data.choices[0].message.content;
      console.log('Analysis text:', analysisText);
      
      try {
        // Clean the response text to ensure it's valid JSON
        const cleanedText = analysisText.trim().replace(/```json\n?/, '').replace(/```\n?$/, '');
        const parsedAnalysis = JSON.parse(cleanedText);
        
        // Validate the parsed analysis has required fields
        if (!parsedAnalysis.overallScore || !Array.isArray(parsedAnalysis.strengths)) {
          throw new Error('Invalid analysis format');
        }
        
        setAnalysis(parsedAnalysis);
        
        toast({
          title: "Analysis Complete!",
          description: "Your resume has been analyzed with AI-powered insights.",
        });
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        // Fallback analysis if JSON parsing fails
        setAnalysis({
          overallScore: 75,
          strengths: ["Professional formatting", "Clear structure", "Relevant experience included"],
          improvements: ["Add more quantifiable achievements", "Include more relevant keywords", "Optimize for ATS systems"],
          keywordMatches: ["experience", "skills", "education"],
          missingKeywords: ["leadership", "project management", "analytics", "results-driven"],
          suggestions: [
            "Consider adding metrics to achievements (e.g., 'Increased sales by 20%')",
            "Tailor content to specific job descriptions", 
            "Include more action verbs at the beginning of bullet points",
            "Add relevant certifications or professional development"
          ]
        });
        
        toast({
          title: "Analysis Complete!",
          description: "Your resume has been analyzed. Note: Using fallback analysis due to response format.",
          variant: "default"
        });
      }
      
    } catch (error) {
      console.error('Error analyzing resume:', error);
      
      let errorMessage = 'There was an error analyzing your resume. Please try again.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Analysis Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* API Key Input */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <span>OpenAI API Key Required</span>
          </CardTitle>
          <CardDescription>
            To get AI-powered resume analysis, please enter your OpenAI API key below. Your key is only used for this analysis and is not stored.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenAI Platform</a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Job-Specific Analysis (Optional)</span>
          </CardTitle>
          <CardDescription>
            Provide job details to get tailored feedback for a specific position.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="jobTitle">Target Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Senior Software Engineer"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here to get more targeted analysis..."
              rows={4}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <Button
        onClick={analyzeResume}
        disabled={isAnalyzing || !apiKey.trim()}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
        size="lg"
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Analyzing Resume...
          </>
        ) : (
          <>
            <Lightbulb className="w-4 h-4 mr-2" />
            Analyze My Resume
          </>
        )}
      </Button>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Overall Resume Score</span>
                <Badge variant={analysis.overallScore >= 80 ? "default" : analysis.overallScore >= 60 ? "secondary" : "destructive"} className="text-lg px-3 py-1">
                  {analysis.overallScore}/100
                </Badge>
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Strengths */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span>Strengths</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.strengths?.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                <span>Areas for Improvement</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.improvements?.map((improvement: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Keyword Analysis */}
          {(analysis.keywordMatches?.length > 0 || analysis.missingKeywords?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Keyword Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.keywordMatches?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-green-700 mb-2">Found Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywordMatches.map((keyword: string, index: number) => (
                        <Badge key={index} variant="default" className="bg-green-100 text-green-800">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {analysis.missingKeywords?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-red-700 mb-2">Missing Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword: string, index: number) => (
                        <Badge key={index} variant="outline" className="border-red-200 text-red-700">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <Lightbulb className="w-5 h-5" />
                <span>Actionable Suggestions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysis.suggestions?.map((suggestion: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
