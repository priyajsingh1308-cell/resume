-- Ensure admin privileges are correctly set
DO $$
BEGIN
    -- Update existing profile if it exists
    UPDATE public.profiles
    SET is_admin = true
    WHERE email = 'ravikishansingh23@gmail.com';

    -- If no profile exists, try to create one by getting the user_id from auth.users
    IF NOT EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE email = 'ravikishansingh23@gmail.com'
    ) THEN
        INSERT INTO public.profiles (user_id, email, is_admin)
        SELECT 
            id as user_id,
            'ravikishansingh23@gmail.com',
            true
        FROM auth.users
        WHERE email = 'ravikishansingh23@gmail.com'
        ON CONFLICT (user_id) DO UPDATE
        SET is_admin = true;
    END IF;
END $$;