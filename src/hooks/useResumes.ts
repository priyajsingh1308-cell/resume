import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import type { Json } from '@/integrations/supabase/types';
import { calculateATSScore } from '@/utils/atsChecker';

export interface SavedResume {
  id: string;
  user_id: string;
  title: string;
  resume_data: Json;
  template_type: string;
  ats_score: number;
  ats_feedback: Json;
  created_at: string;
  updated_at: string;
  expires_at: string;
}

export const useResumes = () => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchResumes = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching resumes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveResume = async (resumeData: any, title: string, templateType: string) => {
    if (!user) return null;

    // Validate resume data
    if (!resumeData.personalInfo?.fullName?.trim()) {
      toast({
        title: "Cannot save resume",
        description: "Please enter your name before saving the resume.",
        variant: "destructive",
      });
      return null;
    }

    // Calculate ATS score before saving
    const atsAnalysis = calculateATSScore(resumeData);

    try {
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          user_id: user.id,
          title,
          resume_data: resumeData,
          template_type: templateType,
          ats_score: atsAnalysis.score,
          ats_feedback: atsAnalysis.feedback
        })
        .select()
        .single();

      if (error) throw error;
      
      setResumes(prev => [data, ...prev]);
      toast({
        title: "Resume saved",
        description: `"${title}" has been saved successfully with an ATS score of ${atsAnalysis.score}%.`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error saving resume",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const updateResume = async (id: string, updates: Partial<SavedResume>) => {
    if (!user) return;

    // If resume_data is being updated, recalculate ATS score
    if (updates.resume_data) {
      const atsAnalysis = calculateATSScore(updates.resume_data);
      updates.ats_score = atsAnalysis.score;
      updates.ats_feedback = atsAnalysis.feedback;
    }
    try {
      const { data, error } = await supabase
        .from('resumes')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setResumes(prev => prev.map(resume => 
        resume.id === id ? data : resume
      ));
      
      toast({
        title: "Resume updated",
        description: `Your resume has been updated with an ATS score of ${updates.ats_score || 'calculated'}%.`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating resume",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteResume = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setResumes(prev => prev.filter(resume => resume.id !== id));
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting resume",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [user]);

  return {
    resumes,
    loading,
    saveResume,
    updateResume,
    deleteResume,
    refetch: fetchResumes
  };
};