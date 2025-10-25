import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FileText,
  Zap,
  Target
} from 'lucide-react';
import type { ATSFeedback, ATSAnalysis } from '@/utils/atsChecker';

interface ATSImprovementSuggestionsProps {
  data: any;
  analysis: ATSAnalysis;
}

const ATSImprovementSuggestions = ({ data, analysis }: ATSImprovementSuggestionsProps) => {
  const { feedback, breakdown, recommendations } = analysis;
  
  const getImprovementPriority = (category: string, score: number) => {
    // Get the actual max score for this category
    const feedbackItem = feedback.find(f => f.category === category);
    const maxScore = feedbackItem?.maxScore || 25;
    const completionPercentage = (score / maxScore) * 100;
    
    if (completionPercentage < 50) return 'high';
    if (completionPercentage < 80) return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertTriangle;
      case 'medium': return Target;
      case 'low': return CheckCircle;
      default: return Lightbulb;
    }
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

  const getSpecificSuggestions = (category: string, data: any) => {
    const suggestions = [];
    
    switch (category.toLowerCase()) {
      case 'contact information':
        if (!data.personalInfo?.email) suggestions.push('Add a professional email address');
        if (!data.personalInfo?.phone) suggestions.push('Include your phone number');
        if (!data.personalInfo?.location) suggestions.push('Add your city and state/country');
        if (!data.personalInfo?.linkedIn) suggestions.push('Include your LinkedIn profile URL');
        break;
        
      case 'skills & keywords':
        if (!data.skills || data.skills.length < 5) suggestions.push('Add at least 5-8 relevant skills');
        if (data.skills && data.skills.length < 10) suggestions.push('Include both technical and soft skills');
        suggestions.push('Research job descriptions for industry-specific keywords');
        suggestions.push('Add skills that match your target job requirements');
        break;
        
      case 'work experience':
        if (!data.experience || data.experience.length === 0) {
          suggestions.push('Add your work experience');
        } else {
          data.experience.forEach((exp: any, index: number) => {
            if (!exp.description || exp.description.length < 100) {
              suggestions.push(`Expand job description for ${exp.jobTitle || `position ${index + 1}`}`);
            }
            if (!exp.startDate || !exp.endDate) {
              suggestions.push(`Add complete dates for ${exp.jobTitle || `position ${index + 1}`}`);
            }
          });
          suggestions.push('Use action verbs to start each bullet point');
          suggestions.push('Include quantifiable achievements (numbers, percentages)');
        }
        break;
        
      case 'education':
        if (!data.education || data.education.length === 0) {
          suggestions.push('Add your educational background');
        } else {
          data.education.forEach((edu: any, index: number) => {
            if (!edu.degree) suggestions.push(`Add degree information for education ${index + 1}`);
            if (!edu.school) suggestions.push(`Add institution name for education ${index + 1}`);
            if (!edu.graduationDate) suggestions.push(`Add graduation date for education ${index + 1}`);
          });
        }
        break;
        
      case 'formatting & structure':
        suggestions.push('Use consistent formatting throughout');
        suggestions.push('Ensure proper section organization');
        suggestions.push('Use bullet points for easy scanning');
        suggestions.push('Keep consistent font and spacing');
        break;
    }
    
    return suggestions;
  };

  const improvementItems = feedback.map(item => {
    const priority = getImprovementPriority(item.category, item.score);    
    const allSuggestions = item.details?.recommendations || item.suggestions;
    
    return {
      ...item,
      priority,
      specificSuggestions: allSuggestions.slice(0, 6)
    };
  });

  // Sort by priority (high first)
  const sortedItems = improvementItems.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
  });

  const highPriorityItems = sortedItems.filter(item => item.priority === 'high');
  const mediumPriorityItems = sortedItems.filter(item => item.priority === 'medium');
  const lowPriorityItems = sortedItems.filter(item => item.priority === 'low');

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 bg-blue-100 border border-blue-200 px-4 py-2 rounded-full mb-4">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <span className="text-blue-700 font-medium text-sm">AI-Powered Improvement Plan</span>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-3">Personalized Action Plan</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Follow these recommendations to boost your ATS score and improve your chances of getting noticed
        </p>
      </div>

      {/* Overall Progress Summary */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Improvement Potential</h3>
              <p className="text-blue-700">Complete these actions to maximize your ATS score</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-900">
                +{Math.round(highPriorityItems.reduce((acc, item) => acc + (25 - item.score), 0) * 1.6)}%
              </div>
              <div className="text-sm text-blue-700">Potential Score Increase</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-lg font-bold text-red-700">{highPriorityItems.length}</div>
              <div className="text-xs text-red-600">High Priority</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-lg font-bold text-yellow-700">{mediumPriorityItems.length}</div>
              <div className="text-xs text-yellow-600">Medium Priority</div>
            </div>
            <div className="p-3 bg-white/60 rounded-lg">
              <div className="text-lg font-bold text-green-700">{lowPriorityItems.length}</div>
              <div className="text-xs text-green-600">Nice to Have</div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Potential score increase: <span className="font-bold text-blue-600">
                  +{Math.round(highPriorityItems.reduce((acc, item) => acc + (item.maxScore - item.score), 0) * 1.2)}%
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action Items */}
      {highPriorityItems.length > 0 && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-200/20 rounded-full -translate-y-10 translate-x-10"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-900">
              <Zap className="w-5 h-5" />
              🚨 High Priority Actions ({highPriorityItems.length})
            </CardTitle>
            <p className="text-red-800">Address these first for maximum impact on your ATS score</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {highPriorityItems.map((item, index) => {
              const IconComponent = getCategoryIcon(item.category);
              const PriorityIcon = getPriorityIcon(item.priority);
              
              return (
                <div key={index} className="bg-white/80 p-5 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-red-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.category}</h4>
                        <p className="text-sm text-gray-600">{item.feedback}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-2xl font-bold text-red-600">
                        {Math.round(item.score * 4)}%
                      </div>
                      <Badge className={getPriorityColor(item.priority)}>
                      <PriorityIcon className="w-3 h-3 mr-1" />
                      {item.priority.toUpperCase()}
                    </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    {item.specificSuggestions.slice(0, 3).map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm p-2 bg-red-50/50 rounded">
                        <ArrowRight className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-3 border-t border-red-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-red-100 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.score * 4}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-600">
                          {Math.round(item.score * 4)}%
                        </span>
                      </div>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                        Fix Now
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Medium Priority Items */}
      {mediumPriorityItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <Target className="w-5 h-5" />
              Medium Priority Improvements ({mediumPriorityItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mediumPriorityItems.map((item, index) => {
              const IconComponent = getCategoryIcon(item.category);
              
              return (
                <div key={index} className="bg-white p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3 mb-3">
                    <IconComponent className="w-5 h-5 text-yellow-600" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.category}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.feedback}</p>
                      
                      <div className="space-y-1">
                        {item.specificSuggestions.slice(0, 2).map((suggestion, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-yellow-600 mt-1">•</span>
                            <span className="text-gray-700">{suggestion}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {Math.round(item.score * 4)}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* Low Priority Items */}
      {lowPriorityItems.length > 0 && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-900">
              <CheckCircle className="w-5 h-5" />
              Nice to Have Improvements ({lowPriorityItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lowPriorityItems.map((item, index) => {
                const IconComponent = getCategoryIcon(item.category);
                
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="font-medium text-gray-900">{item.category}</span>
                        <span className="text-sm text-gray-600 ml-2">- {item.feedback}</span>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {Math.round(item.score * 4)}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Summary */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Focus on High Priority Items First
            </h3>
            <p className="text-blue-800 mb-4">
              Addressing the {highPriorityItems.length} high priority items could improve your ATS score by up to{' '}
              {Math.round(highPriorityItems.reduce((acc, item) => acc + (item.maxScore - item.score), 0) * 1.2)}%
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Start Improving Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ATSImprovementSuggestions;