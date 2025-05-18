-- First, drop the existing foreign key constraint if it exists
ALTER TABLE public.recovery_profiles
    DROP CONSTRAINT IF EXISTS recovery_profiles_user_id_fkey;

-- Re-add the foreign key constraint
ALTER TABLE public.recovery_profiles
    ADD CONSTRAINT recovery_profiles_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES auth.users(id); 