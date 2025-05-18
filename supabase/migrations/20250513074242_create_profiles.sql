/*
  # Create profiles and recovery_profiles tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `created_at` (timestamp)
      - `full_name` (text)
      - `username` (text)
      - `email` (text)
      - `age` (integer)
      - `country` (text)

    - `recovery_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `addiction_type` (text)
      - `goal` (text)
      - `duration` (text)
      - `frequency` (text)
      - `motivation_level` (integer)
      - `support_level` (text)
      - `help_types` (text[])
      - `start_date` (timestamp)
      - `last_updated` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for users to read and update their own profiles
*/

-- Drop existing trigger, function and policies first to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.recovery_profiles;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.recovery_profiles;
DROP TABLE IF EXISTS public.profiles;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    full_name TEXT,
    username TEXT,
    email TEXT,
    age INTEGER,
    country TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create recovery_profiles table
CREATE TABLE public.recovery_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    addiction_type TEXT,
    goal TEXT,
    duration TEXT,
    frequency TEXT,
    motivation_level INTEGER,
    support_level TEXT,
    help_types TEXT[],
    start_date TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create unique constraints
ALTER TABLE public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username),
    ADD CONSTRAINT profiles_email_key UNIQUE (email);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recovery_profiles ENABLE ROW LEVEL SECURITY;

-- Create simplified policies that allow authenticated users to manage their own data
CREATE POLICY "Enable all for authenticated users"
    ON public.profiles
    FOR ALL
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable all for authenticated users"
    ON public.recovery_profiles
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS profiles_id_idx ON public.profiles(id);
CREATE INDEX IF NOT EXISTS recovery_profiles_user_id_idx ON public.recovery_profiles(user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    -- Create a basic profile with email only
    INSERT INTO public.profiles (
        id,
        email,
        created_at,
        updated_at
    )
    VALUES (
        new.id,
        new.email,
        now(),
        now()
    )
    ON CONFLICT (id) DO UPDATE
    SET
        email = EXCLUDED.email,
        updated_at = now()
    WHERE profiles.email IS NULL;
    
    RETURN new;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- Add unique constraint to recovery_profiles table
ALTER TABLE public.recovery_profiles
    ADD CONSTRAINT recovery_profiles_user_id_key UNIQUE (user_id); 