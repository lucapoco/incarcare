import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { auth, profiles, recoveryProfiles, Profile, RecoveryProfile } from '../lib/supabase';

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  recoveryProfile: RecoveryProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string) => Promise<{ data: { user: User | null }, error: Error | null }>;
  signOut: () => Promise<void>;
  createProfile: (userId: string, profile: Omit<Profile, 'id' | 'created_at'>) => Promise<{ error: Error | null }>;
  createRecoveryProfile: (userId: string, profile: Omit<RecoveryProfile, 'id' | 'created_at' | 'user_id' | 'last_updated'>) => Promise<{ error: Error | null }>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: Error | null }>;
  updateRecoveryProfile: (updates: Partial<Omit<RecoveryProfile, 'id' | 'user_id' | 'created_at'>>) => Promise<{ error: Error | null }>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [recoveryProfile, setRecoveryProfile] = useState<RecoveryProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and set the user
    const checkUser = async () => {
      try {
        const { user: currentUser } = await auth.getUser();
        setUser(currentUser);

        if (currentUser) {
          // Fetch user profile
          const { data: userProfile, error: profileError } = await profiles.get(currentUser.id);
          if (profileError) throw profileError;
          setProfile(userProfile);

          // Fetch recovery profile
          const { data: userRecoveryProfile, error: recoveryError } = await recoveryProfiles.get(currentUser.id);
          if (recoveryError) throw recoveryError;
          setRecoveryProfile(userRecoveryProfile);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
        // Reset states on error
        setProfile(null);
        setRecoveryProfile(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signIn(email, password);
      if (error) throw error;

      setUser(data.user);

      // Fetch user profile and recovery profile
      if (data.user) {
        const { data: userProfile } = await profiles.get(data.user.id);
        setProfile(userProfile);

        const { data: userRecoveryProfile } = await recoveryProfiles.get(data.user.id);
        setRecoveryProfile(userRecoveryProfile);
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { data, error } = await auth.signUp(email, password);
      if (error) {
        if (error.message?.includes('already registered')) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }
        throw error;
      }

      // Set the user immediately after successful signup
      setUser(data.user);

      // Fetch and set the profile data
      if (data.user) {
        const { data: userProfile } = await profiles.get(data.user.id);
        setProfile(userProfile);

        const { data: userRecoveryProfile } = await recoveryProfiles.get(data.user.id);
        setRecoveryProfile(userRecoveryProfile);
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: { user: null }, error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      setRecoveryProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const createProfile = async (userId: string, profileData: Omit<Profile, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await profiles.create(profileData, userId);
      if (error) throw error;

      // Update the profile state
      setProfile(data);
      return { error: null };
    } catch (error) {
      console.error('Create profile error:', error);
      return { error: error as Error };
    }
  };

  const createRecoveryProfile = async (userId: string, profileData: Omit<RecoveryProfile, 'id' | 'created_at' | 'user_id' | 'last_updated'>) => {
    try {
      const { data, error } = await recoveryProfiles.create({
        ...profileData,
        user_id: userId,
      });
      if (error) throw error;

      // Update the recovery profile state
      setRecoveryProfile(data);
      return { error: null };
    } catch (error) {
      console.error('Create recovery profile error:', error);
      return { error: error as Error };
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await profiles.update(user.id, updates);
      if (error) throw error;

      setProfile(data);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updateRecoveryProfile = async (updates: Partial<Omit<RecoveryProfile, 'id' | 'user_id' | 'created_at'>>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await recoveryProfiles.update(user.id, updates);
      if (error) throw error;

      setRecoveryProfile(data);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    user,
    profile,
    recoveryProfile,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    createProfile,
    createRecoveryProfile,
    updateProfile,
    updateRecoveryProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};