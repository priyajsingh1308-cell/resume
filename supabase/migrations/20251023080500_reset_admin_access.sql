-- Reset and fix admin privileges
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Get the user ID from auth.users
    SELECT id INTO admin_user_id
    FROM auth.users
    WHERE email = 'ravikishansingh23@gmail.com';

    IF admin_user_id IS NULL THEN
        RAISE EXCEPTION 'Admin user not found in auth.users';
    END IF;

    -- Delete any duplicate or incorrect profiles for the admin email
    DELETE FROM public.profiles
    WHERE email = 'ravikishansingh23@gmail.com'
    AND user_id != admin_user_id;

    -- Upsert the correct admin profile
    INSERT INTO public.profiles (
        user_id,
        email,
        is_admin,
        created_at,
        updated_at
    ) VALUES (
        admin_user_id,
        'ravikishansingh23@gmail.com',
        true,
        now(),
        now()
    )
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        is_admin = true,
        email = 'ravikishansingh23@gmail.com',
        updated_at = now();

    -- Verify the admin profile exists and is correct
    IF NOT EXISTS (
        SELECT 1 
        FROM public.profiles 
        WHERE user_id = admin_user_id 
        AND email = 'ravikishansingh23@gmail.com' 
        AND is_admin = true
    ) THEN
        RAISE EXCEPTION 'Failed to create or update admin profile';
    END IF;
END $$;