
import { useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LinkedInCallbackHandlerProps {
  onImportSuccess: (data: any) => void;
  onImportStart: () => void;
  onImportError: () => void;
}

const LinkedInCallbackHandler = ({ onImportSuccess, onImportStart, onImportError }: LinkedInCallbackHandlerProps) => {
  const { session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const importPending = sessionStorage.getItem('linkedin_import_pending');
    
    console.log('LinkedInCallbackHandler - checking session:', {
      importPending,
      hasSession: !!session,
      provider: session?.user?.app_metadata?.provider,
      hasProviderToken: !!session?.provider_token
    });

    if (importPending === 'true' && session?.provider_token && 
        (session.user.app_metadata.provider === 'linkedin' || session.user.app_metadata.provider === 'linkedin_oidc')) {
      sessionStorage.removeItem('linkedin_import_pending');
      onImportStart();

      const importProfile = async (accessToken: string) => {
        try {
          console.log('Starting LinkedIn profile import...');
          
          const { data, error } = await supabase.functions.invoke('linkedin-import', {
            body: { accessToken }
          });
    
          if (error) {
            console.error('Supabase function error:', error);
            throw error;
          }
          
          if (data.success) {
            console.log('LinkedIn import successful:', data.data);
            toast({
              title: "Profile Imported Successfully",
              description: "Your LinkedIn profile has been imported.",
            });
            onImportSuccess(data.data);
          } else {
            console.error('LinkedIn import failed:', data.error);
            throw new Error(data.error || 'Import failed');
          }
        } catch (error) {
          console.error('LinkedIn import error:', error);
          toast({
            title: "Import Failed",
            description: (error as Error).message || "Failed to import LinkedIn profile. Please try again.",
            variant: "destructive"
          });
          onImportError();
        }
      };
      
      if (session.provider_token) {
        console.log('Using provider token for import');
        importProfile(session.provider_token);
      } else {
        console.error('No provider token available');
        toast({
          title: "Authentication Error",
          description: "No access token received from LinkedIn. Please try again.",
          variant: "destructive"
        });
        onImportError();
      }
    }
  }, [session, onImportSuccess, onImportStart, onImportError, toast]);

  return null; // This is a logic-only component
};

export default LinkedInCallbackHandler;
