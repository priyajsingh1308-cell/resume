import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  signInWithLinkedIn: () => Promise<{ error: any }>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const clearAuthData = useCallback(() => {
    // Clear all auth-related data from localStorage
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('sb-')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear session storage as well
    sessionStorage.removeItem('linkedin_import_pending');
    
    setSession(null);
    setUser(null);
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      clearAuthData();
      toast({
        title: "Signed out successfully",
        description: "You've been signed out of your account.",
      });
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if sign out fails, clear local data
      clearAuthData();
    } finally {
      setLoading(false);
    }
  }, [clearAuthData, toast]);

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state change:', event, session?.user?.id);
        
        if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed successfully');
        } else if (event === 'SIGNED_IN') {
          console.log('User signed in successfully');
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          clearAuthData();
        } else if (event === 'TOKEN_REFRESH_FAILED') {
          console.warn('Token refresh failed, clearing auth data');
          clearAuthData();
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!mounted) return;
      
      if (error) {
        console.error('Session error:', error);
        // If there's an error getting the session, clear auth data
        if (error.message?.includes('refresh_token_not_found') || 
            error.message?.includes('Invalid Refresh Token') ||
            error.message?.includes('JWT expired')) {
          // Use signOut to ensure complete cleanup including Supabase client state
          signOut().catch(console.error);
          return; // Don't set loading to false here, let onAuthStateChange handle it
        }
        setSession(null);
        setUser(null);
        setLoading(false);
      } else {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    }).catch((error) => {
      if (!mounted) return;
      
      console.error('Failed to get session:', error);
      // Handle network errors or other fetch failures
      if (error.message?.includes('Failed to fetch') || 
          error.message?.includes('refresh_token_not_found') ||
          error.message?.includes('Invalid Refresh Token')) {
        // Use signOut to ensure complete cleanup
        signOut().catch(console.error);
        return; // Don't set loading to false here, let onAuthStateChange handle it
      }
      
      setSession(null);
      setUser(null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [signOut]);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (!error) {
        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        });
      }
      
      return { error };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        // If credentials are invalid, make sure we clear any stale data
        if (error.message?.includes('invalid_credentials')) {
          clearAuthData();
        }
      }
      
      return { error };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
      clearAuthData();
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      // Set a flag to indicate LinkedIn import is pending
      sessionStorage.setItem('linkedin_import_pending', 'true');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin',
        options: {
          redirectTo: `${window.location.origin}/`,
          scopes: 'r_liteprofile r_emailaddress w_member_social'
        }
      });
      
      if (error) {
        sessionStorage.removeItem('linkedin_import_pending');
        console.error('LinkedIn OAuth error:', error);
      }
      
      return { error };
    } catch (error) {
      sessionStorage.removeItem('linkedin_import_pending');
      console.error('LinkedIn sign-in error:', error);
      return { error };
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    signInWithLinkedIn,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};