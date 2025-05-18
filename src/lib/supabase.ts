import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add debug logging
console.log('Initializing Supabase client...');
console.log('Supabase URL exists:', !!supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Test the connection
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Supabase auth event:', event);
  console.log('Session exists:', !!session);
});

// Types for our database tables
export type Profile = {
  id: string;
  created_at: string;
  full_name: string;
  username: string;
  email: string;
  age: number;
  country: string;
};

export type RecoveryProfile = {
  id: string;
  user_id: string;
  created_at: string;
  addiction_type: string;
  goal: string;
  duration: string;
  frequency: string;
  motivation_level: number;
  support_level: string;
  help_types: string[];
  start_date?: string;
  last_updated: string;
};

// Helper functions for authentication and profile management
export const auth = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  },
};

// Helper functions for profile management
export const profiles = {
  create: async (profile: Omit<Profile, 'id' | 'created_at'>, userId: string) => {
    try {
      const timestamp = new Date().toISOString();
      
      // Use upsert to handle both creation and update
      const { data, error } = await supabase
        .from('profiles')
        .upsert([{
          ...profile,
          id: userId,
          updated_at: timestamp
        }], {
          onConflict: 'id'
        })
        .select()
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error in profile creation:', error);
      return { data: null, error: error as Error };
    }
  },

  get: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting profile:', error);
      return { data: null, error: error as Error };
    }
  },
};

// Helper functions for recovery profile management
export const recoveryProfiles = {
  create: async (profile: Omit<RecoveryProfile, 'id' | 'created_at' | 'last_updated'>) => {
    try {
      const timestamp = new Date().toISOString();
      
      console.log('Creating recovery profile with data:', {
        ...profile,
        created_at: timestamp,
        last_updated: timestamp
      });
      
      // Use upsert to handle both creation and update
      const { data, error } = await supabase
        .from('recovery_profiles')
        .upsert([{
          ...profile,
          created_at: timestamp,
          last_updated: timestamp
        }], {
          onConflict: 'user_id'
        })
        .select()
        .maybeSingle();

      if (error) {
        console.error('Supabase error in recovery profile creation:', error);
        throw error;
      }
      
      console.log('Recovery profile created successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in recovery profile creation:', error);
      return { data: null, error: error as Error };
    }
  },

  get: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('recovery_profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      // Handle the case where no profile exists
      if (error && error.code === 'PGRST116') {
        return { data: null, error: null };
      }

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error getting recovery profile:', error);
      return { data: null, error: error as Error };
    }
  },
};

// Helper functions for notifications
export const notifications = {
  create: async (notification: {
    user_id: string;
    title: string;
    message: string;
    type: string;
  }) => {
    try {
      console.log('Creating notification:', notification);
      
      const { data, error } = await supabase
        .from('notifications')
        .insert([{
          ...notification,
          read: false
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating notification:', error);
        throw error;
      }

      console.log('Notification created successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in notifications.create:', error);
      return { data: null, error: error as Error };
    }
  },

  get: async (userId: string) => {
    try {
      console.log('Fetching notifications for user:', userId);
      
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching notifications:', error);
        throw error;
      }

      console.log('Notifications fetched successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in notifications.get:', error);
      return { data: null, error: error as Error };
    }
  },

  markAsRead: async (notificationId: string) => {
    try {
      console.log('Marking notification as read:', notificationId);
      
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        console.error('Error marking notification as read:', error);
        throw error;
      }

      console.log('Notification marked as read successfully');
      return { error: null };
    } catch (error) {
      console.error('Error in notifications.markAsRead:', error);
      return { error: error as Error };
    }
  }
};

// Helper functions for events
export const events = {
  create: async (event: {
    user_id: string;
    title: string;
    description?: string;
    event_date: string;
    event_time: string;
    type: string;
  }) => {
    try {
      console.log('Creating event:', event);
      
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select()
        .single();

      if (error) {
        console.error('Error creating event:', error);
        throw error;
      }

      console.log('Event created successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in events.create:', error);
      return { data: null, error: error as Error };
    }
  },

  get: async (userId: string) => {
    try {
      console.log('Fetching events for user:', userId);
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', userId)
        .order('event_date', { ascending: true })
        .order('event_time', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }

      console.log('Events fetched successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in events.get:', error);
      return { data: null, error: error as Error };
    }
  },

  update: async (eventId: string, updates: {
    title?: string;
    description?: string;
    event_date?: string;
    event_time?: string;
    type?: string;
  }) => {
    try {
      console.log('Updating event:', eventId, updates);
      
      const { data, error } = await supabase
        .from('events')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', eventId)
        .select()
        .single();

      if (error) {
        console.error('Error updating event:', error);
        throw error;
      }

      console.log('Event updated successfully:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Error in events.update:', error);
      return { data: null, error: error as Error };
    }
  },

  delete: async (eventId: string) => {
    try {
      console.log('Deleting event:', eventId);
      
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', eventId);

      if (error) {
        console.error('Error deleting event:', error);
        throw error;
      }

      console.log('Event deleted successfully');
      return { error: null };
    } catch (error) {
      console.error('Error in events.delete:', error);
      return { error: error as Error };
    }
  }
};

export const resources = {
  async get() {
    console.log('Fetching resources...');
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
    
    console.log('Resources fetched successfully:', data);
    return data;
  },

  async create(resource: {
    title: string;
    description: string;
    category: string;
    type: string;
    time: string;
    difficulty: string;
    content_url?: string;
  }) {
    console.log('Creating resource:', resource);
    const { data, error } = await supabase
      .from('resources')
      .insert([resource])
      .select()
      .single();
    
    if (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
    
    console.log('Resource created successfully:', data);
    return data;
  },

  async update(id: string, updates: Partial<{
    title: string;
    description: string;
    category: string;
    type: string;
    time: string;
    difficulty: string;
    content_url: string;
  }>) {
    console.log('Updating resource:', { id, updates });
    const { data, error } = await supabase
      .from('resources')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
    
    console.log('Resource updated successfully:', data);
    return data;
  },

  async delete(id: string) {
    console.log('Deleting resource:', id);
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
    
    console.log('Resource deleted successfully');
  }
};