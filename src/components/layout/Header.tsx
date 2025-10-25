import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth/AuthProvider';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      try {
        interface ProfileResponse {
          is_admin: boolean;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('user_id', user.id)
          .single<ProfileResponse>();

        if (error) throw error;
        setIsAdmin(data?.is_admin ?? false);
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  return (
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
                  <Button variant="ghost" onClick={() => navigate('/Dashboard')} className="hover:bg-blue-50 font-medium">
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
  );
}
