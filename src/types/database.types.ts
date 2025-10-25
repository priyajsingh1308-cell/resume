export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          full_name: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
          is_admin: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          full_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          full_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
          is_admin?: boolean;
        };
      };
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          excerpt: string | null;
          author_id: string;
          author_name: string;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          excerpt?: string | null;
          author_id: string;
          author_name: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          excerpt?: string | null;
          author_id?: string;
          author_name?: string;
          published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      resumes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          template_type: string;
          resume_data: any;
          ats_score: number | null;
          ats_feedback: any | null;
          created_at: string;
          updated_at: string;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          template_type: string;
          resume_data: any;
          ats_score?: number | null;
          ats_feedback?: any | null;
          created_at?: string;
          updated_at?: string;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          template_type?: string;
          resume_data?: any;
          ats_score?: number | null;
          ats_feedback?: any | null;
          created_at?: string;
          updated_at?: string;
          expires_at?: string | null;
        };
      };
    };
  };
}