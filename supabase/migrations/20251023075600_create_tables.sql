-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    is_admin BOOLEAN DEFAULT false
);

-- Create blogs table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create resumes table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    template_type TEXT NOT NULL,
    resume_data JSONB,
    ats_score INTEGER,
    ats_feedback JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    expires_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can view their own profile'
    ) THEN
        CREATE POLICY "Users can view their own profile"
        ON public.profiles FOR SELECT
        TO authenticated
        USING (auth.uid() = user_id OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
    ) THEN
        CREATE POLICY "Users can update their own profile"
        ON public.profiles FOR UPDATE
        TO authenticated
        USING (auth.uid() = user_id);
    END IF;
END $$;

-- Create policies for blogs if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'blogs' AND policyname = 'Anyone can view published blogs'
    ) THEN
        CREATE POLICY "Anyone can view published blogs"
        ON public.blogs FOR SELECT
        TO authenticated
        USING (published = true OR author_id = auth.uid() OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'blogs' AND policyname = 'Authors can update their own blogs'
    ) THEN
        CREATE POLICY "Authors can update their own blogs"
        ON public.blogs FOR UPDATE
        TO authenticated
        USING (author_id = auth.uid() OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'blogs' AND policyname = 'Authors can delete their own blogs'
    ) THEN
        CREATE POLICY "Authors can delete their own blogs"
        ON public.blogs FOR DELETE
        TO authenticated
        USING (author_id = auth.uid() OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'blogs' AND policyname = 'Authenticated users can create blogs'
    ) THEN
        CREATE POLICY "Authenticated users can create blogs"
        ON public.blogs FOR INSERT
        TO authenticated
        WITH CHECK (author_id = auth.uid() OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;
END $$;

-- Create policies for resumes if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'resumes' AND policyname = 'Users can view their own resumes'
    ) THEN
        CREATE POLICY "Users can view their own resumes"
        ON public.resumes FOR SELECT
        TO authenticated
        USING (user_id = auth.uid() OR (
            SELECT is_admin FROM public.profiles WHERE user_id = auth.uid()
        ));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'resumes' AND policyname = 'Users can create their own resumes'
    ) THEN
        CREATE POLICY "Users can create their own resumes"
        ON public.resumes FOR INSERT
        TO authenticated
        WITH CHECK (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'resumes' AND policyname = 'Users can update their own resumes'
    ) THEN
        CREATE POLICY "Users can update their own resumes"
        ON public.resumes FOR UPDATE
        TO authenticated
        USING (user_id = auth.uid());
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'resumes' AND policyname = 'Users can delete their own resumes'
    ) THEN
        CREATE POLICY "Users can delete their own resumes"
        ON public.resumes FOR DELETE
        TO authenticated
        USING (user_id = auth.uid());
    END IF;
END $$;

-- Grant admin privileges to your email
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'ravikishansingh23@gmail.com';

-- Create trigger function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_profiles_updated_at'
    ) THEN
        CREATE TRIGGER update_profiles_updated_at
            BEFORE UPDATE ON public.profiles
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_blogs_updated_at'
    ) THEN
        CREATE TRIGGER update_blogs_updated_at
            BEFORE UPDATE ON public.blogs
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_resumes_updated_at'
    ) THEN
        CREATE TRIGGER update_resumes_updated_at
            BEFORE UPDATE ON public.resumes
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;