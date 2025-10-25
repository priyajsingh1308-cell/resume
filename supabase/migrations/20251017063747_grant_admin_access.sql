/*
  # Grant Admin Access to Primary Administrator

  1. Changes
    - Updates the profile for ravikishansingh23@gmail.com to have admin privileges
    - If the profile doesn't exist yet, this migration will be safe and ready for when the user signs up

  2. Security
    - Uses a safe UPDATE query with email filter
    - Only affects the specified email address
    - Does not bypass RLS policies

  3. Notes
    - This migration is idempotent and can be run multiple times safely
    - Admin status will be granted immediately upon profile creation if user signs up after this migration
*/

-- Grant admin privileges to the primary administrator email
UPDATE public.profiles 
SET is_admin = true 
WHERE email = 'ravikishansingh23@gmail.com';

-- Create a function to automatically grant admin to specific email on signup
CREATE OR REPLACE FUNCTION public.auto_grant_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Automatically grant admin status to the primary administrator email
  IF NEW.email = 'ravikishansingh23@gmail.com' THEN
    NEW.is_admin = true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to run before profile insert
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'auto_grant_admin_trigger') THEN
    CREATE TRIGGER auto_grant_admin_trigger
      BEFORE INSERT ON public.profiles
      FOR EACH ROW
      EXECUTE FUNCTION public.auto_grant_admin();
  END IF;
END $$;
