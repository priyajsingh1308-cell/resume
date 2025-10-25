import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase-client';
import { useAuth } from '@/components/auth/AuthProvider';
import type { Database } from '@/types/database.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Users, FileText, BookOpen, TrendingUp, Activity, Shield } from 'lucide-react';
import Header from '@/components/layout/Header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type Tables = Database['public']['Tables'];
type Blog = Tables['blogs']['Row'];
type Profile = Tables['profiles']['Row'] & {
  'auth.users': {
    email: string;
  };
};
type Resume = Tables['resumes']['Row'] & {
  ats_score?: number;
  user_id: string;
};

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalResumes: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    averageATSScore: 0,
    highScoringResumes: 0
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    published: false,
  });

  useEffect(() => {
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    console.log('🔍 Starting admin status check...');
    console.log('👤 Current user:', { 
      id: user?.id, 
      email: user?.email,
      metadata: user?.user_metadata 
    });

    if (!user?.id || !user?.email) {
      console.log('❌ No user found or missing email/id, redirecting to auth');
      navigate('/auth');
      return;
    }

    try {
      // First, verify the user exists in auth.users
      console.log('🔎 Checking auth user status...');
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      
      console.log('🔑 Auth user data:', authUser);
      if (authError) {
        console.error('❌ Auth error:', authError);
        throw authError;
      }

      // Check if user's profile exists and is admin
      console.log('👥 Fetching profile for user ID:', user.id);
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*, auth.users!inner(email)')
        .eq('user_id', user.id)
        .single();

      console.log('📋 Profile query result:', { existingProfile, fetchError });

      if (fetchError) {
        console.error('❌ Error fetching profile:', fetchError);
        if (fetchError.code === 'PGRST116') { // Not found
          console.log('⚠️ No profile found, will create one');
        } else {
          throw fetchError;
        }
      }

      console.log('📝 Existing profile:', existingProfile);

      if (!existingProfile) {
        console.log('📝 Creating new profile for:', user.email);
        
        // Double-check if email matches admin email
        const isAdminEmail = user.email.toLowerCase() === 'ravikishansingh23@gmail.com'.toLowerCase();
        console.log('🔑 Is admin email?', isAdminEmail);

        // Create new profile with admin status if it matches the admin email
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert([
            { 
              user_id: user.id, 
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              is_admin: isAdminEmail
            }
          ])
          .select('*, auth.users!inner(email)')
          .single();
        
        console.log('✨ Profile creation result:', { 
          profile: newProfile,
          error: createError,
          isAdmin: newProfile?.is_admin
        });

        if (createError) {
          console.error('❌ Failed to create profile:', createError);
          toast.error('Failed to create user profile');
          navigate('/');
          return;
        }
        
        if (!newProfile?.is_admin) {
          console.log('⛔ New profile is not admin');
          toast.error('Access denied. Admin privileges required.');
          navigate('/');
          return;
        }
      } else if (!existingProfile.is_admin) {
        console.log('⛔ Existing profile is not admin:', {
          email: existingProfile.email,
          userId: existingProfile.user_id,
          isAdmin: existingProfile.is_admin
        });
        
        // If email matches but not admin, try to update admin status
        if (existingProfile.email?.toLowerCase() === 'ravikishansingh23@gmail.com'.toLowerCase()) {
          console.log('🔄 Attempting to update admin status...');
          const { data: updatedProfile, error: updateError } = await supabase
            .from('profiles')
            .update({ is_admin: true })
            .eq('user_id', user.id)
            .select()
            .single();
            
          if (updateError) {
            console.error('❌ Failed to update admin status:', updateError);
            toast.error('Failed to update admin status');
            navigate('/');
            return;
          }
          
          if (updatedProfile?.is_admin) {
            console.log('✅ Admin status updated successfully');
            setIsAdmin(true);
            return;
          }
        }
        
        toast.error('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      console.log('✅ Admin access granted');
      setIsAdmin(true);
    } catch (error) {
      console.error('❌ Error checking admin status:', error);
      toast.error('Failed to verify admin status');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      console.log('Starting to load all data...');
      const results = await Promise.allSettled([
        loadBlogs(),
        loadProfiles(),
        loadResumes(),
      ]);
      
      const failures = results.filter(r => r.status === 'rejected');
      if (failures.length > 0) {
        console.error('Some data failed to load:', failures);
        toast.error(`${failures.length} data sources failed to load`);
      } else {
        toast.success('All data loaded successfully');
      }
    } catch (error) {
      console.error('Error in loadAllData:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadBlogs = async () => {
    console.log('Loading blogs...');
    try {
      const { data: blogs, error: blogsError } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Blogs response:', { blogs, blogsError });

      if (blogsError) {
        console.error('Error loading blogs:', blogsError);
        throw blogsError;
      }

      setBlogs(blogs || []);

       setBlogs(formattedBlogs);
      updateStats({ 
        totalBlogs: formattedBlogs.length, 
        publishedBlogs: formattedBlogs.filter(b => b.published).length 
      });
    } catch (error) {
      console.error('Error loading blogs:', error);
      toast.error('Failed to load blogs');
    }
  };

  const loadProfiles = async () => {
    console.log('Loading profiles as admin...');
    try {
      // First verify we're still admin
      const { data: adminCheck } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('user_id', user?.id)
        .single() as { data: { is_admin: boolean } | null };
      
      console.log('Admin check result:', adminCheck);

      if (!adminCheck || !adminCheck.is_admin) {
        console.error('Not admin - should not happen here');
        throw new Error('Admin privileges required');
      }

      // Now fetch all profiles with full information
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*, auth.users!inner(email)')
        .order('created_at', { ascending: false });

      console.log('Profiles response:', { profiles, profilesError });

      if (profilesError) {
        console.error('Error loading profiles:', profilesError);
        throw profilesError;
      }

      setProfiles(profiles || []);
      updateStats({ 
        totalUsers: profiles?.length || 0,
        activeUsers: profiles?.length || 0 // We'll update this when we load resumes
      });
    } catch (error) {
      console.error('Error in loadProfiles:', error);
      toast.error('Failed to load profiles');
      throw error;
    }
  };

  const loadResumes = async () => {
    console.log('Loading resumes...');
    try {
      const { data: resumes, error: resumesError } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('Resumes response:', { resumes, resumesError });

      if (resumesError) {
        console.error('Error loading resumes:', resumesError);
        throw resumesError;
      }

      setResumes(resumes || []);

      // Calculate statistics
      const totalATS = (resumes || []).reduce((sum, resume) => sum + (resume.ats_score || 0), 0);
      const avgATS = resumes?.length ? Math.round(totalATS / resumes.length) : 0;
      const highScoringResumes = (resumes || []).filter(r => (r.ats_score || 0) > 80).length;

      updateStats({ 
        totalResumes: resumes?.length || 0, 
        averageATSScore: avgATS,
        highScoringResumes
      });

      // Update active users count based on unique user_ids in resumes
      if (resumes?.length) {
        const activeUserIds = new Set(resumes.map(r => r.user_id));
        updateStats({ activeUsers: activeUserIds.size });
      }
    } catch (error) {
      console.error('Error in loadResumes:', error);
      toast.error('Failed to load resumes');
      throw error;
    }
  };

  const updateStats = (newStats: Partial<typeof stats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('user_id', user?.id)
        .maybeSingle();

      const blogData = {
        ...formData,
        author_id: user?.id,
        author_name: profile?.full_name || 'Admin',
      };

      if (editingBlog) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', editingBlog.id);

        if (error) throw error;
        toast.success('Blog updated successfully');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
        toast.success('Blog created successfully');
      }

      setIsDialogOpen(false);
      resetForm();
      loadBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      published: blog.published,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;
      toast.success('Blog deleted successfully');
      setDeleteId(null);
      loadBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const toggleAdminStatus = async (profileId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_admin: !currentStatus })
        .eq('id', profileId);

      if (error) throw error;
      toast.success(`Admin status ${!currentStatus ? 'granted' : 'revoked'}`);
      loadProfiles();
    } catch (error) {
      console.error('Error updating admin status:', error);
      toast.error('Failed to update admin status');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      published: false,
    });
    setEditingBlog(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all application data and settings</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blogs">Blogs</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="resumes">Resumes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">Registered accounts</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalResumes}</div>
                  <p className="text-xs text-muted-foreground">Created by users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalBlogs}</div>
                  <p className="text-xs text-muted-foreground">{stats.publishedBlogs} published</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg ATS Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.averageATSScore}%</div>
                  <p className="text-xs text-muted-foreground">Across all resumes</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest activities across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumes.slice(0, 5).map((resume) => (
                    <div key={resume.id} className="flex items-center gap-4">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{resume.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(resume.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blogs" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </DialogTitle>
                    <DialogDescription>
                      {editingBlog ? 'Update the blog post details below' : 'Fill in the details to create a new blog post'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Enter blog title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Input
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder="Brief description (optional)"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        placeholder="Write your blog content here..."
                        className="min-h-[300px]"
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button type="button" variant="outline" onClick={() => {
                        setIsDialogOpen(false);
                        resetForm();
                      }}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingBlog ? 'Update' : 'Create'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {blogs.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-500">No blog posts yet. Create your first one!</p>
                  </CardContent>
                </Card>
              ) : (
                blogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle>{blog.title}</CardTitle>
                            <span className={`text-xs px-2 py-1 rounded ${
                              blog.published
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <CardDescription>
                            By {blog.author_name} • {new Date(blog.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(blog)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteId(blog.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {blog.excerpt && (
                        <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                      )}
                      <p className="text-sm text-gray-700 line-clamp-3">{blog.content}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user accounts and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{profile.full_name || 'N/A'}</p>
                        <p className="text-sm text-gray-600">{profile.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined: {new Date(profile.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {profile.is_admin && (
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            Admin
                          </span>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                          disabled={profile.user_id === user?.id}
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resumes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Resumes</CardTitle>
                <CardDescription>View all resumes created by users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resumes.map((resume) => (
                    <div key={resume.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{resume.title}</p>
                        <p className="text-sm text-gray-600 capitalize">{resume.template_type} Template</p>
                        <p className="text-xs text-gray-500">
                          {new Date(resume.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">ATS Score</p>
                        <p className={`text-lg font-bold ${
                          resume.ats_score >= 80 ? 'text-green-600' :
                          resume.ats_score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {resume.ats_score}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
