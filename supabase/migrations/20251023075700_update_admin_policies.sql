-- Drop existing profile view policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create new profile view policy with explicit admin access
CREATE POLICY "Users can view their own profile or admins can view all"
ON public.profiles FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id 
    OR EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND is_admin = true
    )
);

-- Grant admin access to update/delete profiles
CREATE POLICY "Admins can update any profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND is_admin = true
    )
);

CREATE POLICY "Admins can delete any profile"
ON public.profiles FOR DELETE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND is_admin = true
    )
);