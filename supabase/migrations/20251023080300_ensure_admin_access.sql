-- Ensure admin privileges are correctly set
DO $$
BEGIN
    -- First, ensure the profile exists
    INSERT INTO public.profiles (user_id, email, is_admin)
    SELECT 
        auth.uid(),
        'ravikishansingh23@gmail.com',
        true
    FROM auth.users
    WHERE email = 'ravikishansingh23@gmail.com'
    ON CONFLICT (user_id) DO UPDATE
    SET is_admin = true;

    -- If profile exists but needs admin rights
    UPDATE public.profiles
    SET is_admin = true
    WHERE email = 'ravikishansingh23@gmail.com'
    OR user_id IN (
        SELECT id 
        FROM auth.users 
        WHERE email = 'ravikishansingh23@gmail.com'
    );
END $$;