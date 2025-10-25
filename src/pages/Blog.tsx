import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, CreditCard as Edit, Trash2, Eye, Sparkles, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  featured_image?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
  view_count: number;
  ai_generated: boolean;
}

export default function Blog() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    featured_image: '',
  });

  const handleGenerateContent = async () => {
    if (!formData.title) {
      toast({
        title: 'Error',
        description: 'Please enter a title first',
        variant: 'destructive',
      });
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedContent = `# ${formData.title}

This is an AI-generated blog post about ${formData.title}.

## Introduction

In today's fast-paced professional world, ${formData.title.toLowerCase()} has become increasingly important. This comprehensive guide will walk you through everything you need to know.

## Key Points

1. **Understanding the Basics**: Getting started is easier than you think.
2. **Best Practices**: Follow these proven strategies for success.
3. **Common Mistakes**: Avoid these pitfalls to save time and effort.

## Conclusion

By following these guidelines, you'll be well on your way to mastering ${formData.title.toLowerCase()}.

---

*This content was automatically generated using AI to help you get started quickly.*`;

      const excerpt = `A comprehensive guide to ${formData.title.toLowerCase()}. Learn the best practices, avoid common mistakes, and achieve success in your professional journey.`;

      setFormData(prev => ({
        ...prev,
        content: generatedContent,
        excerpt: excerpt,
      }));

      toast({
        title: 'Content Generated!',
        description: 'AI has generated blog content for you. Feel free to edit and customize it.',
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!formData.title || !formData.content) {
      toast({
        title: 'Error',
        description: 'Please fill in title and content',
        variant: 'destructive',
      });
      return;
    }

    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt || formData.content.substring(0, 150) + '...',
      slug,
      status,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      featured_image: formData.featured_image,
      published_at: status === 'published' ? new Date().toISOString() : undefined,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      view_count: 0,
      ai_generated: formData.content.includes('automatically generated'),
    };

    if (editingPost) {
      setPosts(posts.map(p => (p.id === editingPost.id ? { ...newPost, id: editingPost.id, created_at: editingPost.created_at } : p)));
      toast({
        title: 'Post Updated!',
        description: `Your blog post has been ${status === 'published' ? 'published' : 'saved as draft'}.`,
      });
    } else {
      setPosts([newPost, ...posts]);
      toast({
        title: 'Post Created!',
        description: `Your blog post has been ${status === 'published' ? 'published' : 'saved as draft'}.`,
      });
    }

    setFormData({ title: '', content: '', excerpt: '', tags: '', featured_image: '' });
    setIsCreating(false);
    setEditingPost(null);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      tags: post.tags.join(', '),
      featured_image: post.featured_image || '',
    });
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(p => p.id !== id));
    toast({
      title: 'Post Deleted',
      description: 'Blog post has been removed.',
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800',
    };
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>Please sign in to access the blog management system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = '/auth'} className="w-full">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/upscalemedia-transformed.png" alt="Resume Pilot" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-foreground">Blog Management</h1>
          </div>
          <Button variant="outline" onClick={() => window.location.href = '/'}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {!isCreating ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold">Your Blog Posts</h2>
                  <p className="text-gray-600">Create and manage your blog content</p>
                </div>
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </div>

              <Tabs defaultValue="all" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts ({posts.length})</TabsTrigger>
                  <TabsTrigger value="published">
                    Published ({posts.filter(p => p.status === 'published').length})
                  </TabsTrigger>
                  <TabsTrigger value="draft">
                    Drafts ({posts.filter(p => p.status === 'draft').length})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4">
                  {posts.length === 0 ? (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Sparkles className="w-16 h-16 text-gray-400 mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No blog posts yet</h3>
                        <p className="text-gray-600 mb-4 text-center">
                          Create your first blog post with AI-powered content generation
                        </p>
                        <Button onClick={() => setIsCreating(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Create First Post
                        </Button>
                      </CardContent>
                    </Card>
                  ) : (
                    posts.map(post => (
                      <Card key={post.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <CardTitle className="text-xl">{post.title}</CardTitle>
                                {getStatusBadge(post.status)}
                                {post.ai_generated && (
                                  <Badge variant="outline" className="bg-purple-50 text-purple-700">
                                    <Sparkles className="w-3 h-3 mr-1" />
                                    AI Generated
                                  </Badge>
                                )}
                              </div>
                              <CardDescription className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {format(new Date(post.created_at), 'MMM dd, yyyy')}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {post.view_count} views
                                </span>
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600">{post.excerpt}</p>
                          {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
                              <Trash2 className="w-3 h-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="published" className="space-y-4">
                  {posts.filter(p => p.status === 'published').map(post => (
                    <Card key={post.id}>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="draft" className="space-y-4">
                  {posts.filter(p => p.status === 'draft').map(post => (
                    <Card key={post.id}>
                      <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{editingPost ? 'Edit' : 'Create New'} Blog Post</CardTitle>
                <CardDescription>
                  Use AI to generate content or write your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter blog post title"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleGenerateContent}
                    disabled={isGenerating || !formData.title}
                    variant="outline"
                    className="flex-1"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generating...' : 'Generate Content with AI'}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content here..."
                    className="min-h-[300px] font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Short summary of your post"
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="career, resume, tips"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="featured_image">Featured Image URL (optional)</Label>
                  <Input
                    id="featured_image"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => handleSubmit('draft')} variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button onClick={() => handleSubmit('published')} className="flex-1">
                    Publish Now
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCreating(false);
                      setEditingPost(null);
                      setFormData({ title: '', content: '', excerpt: '', tags: '', featured_image: '' });
                    }}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
