/**
 * Supabase Client Configuration
 * 
 * This file creates a secure Supabase client instance.
 * The credentials are loaded from environment variables (.env file)
 * which is never committed to git for security.
 * 
 * Security Notes:
 * - The ANON_KEY is safe to expose in frontend code (it's public)
 * - Row Level Security (RLS) policies in Supabase protect your data
 * - Never expose the SERVICE_ROLE_KEY in frontend code
 */

import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
// Vite uses VITE_ prefix for environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file:\n' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set.'
  );
}

// Create and export the Supabase client
// This client will automatically handle authentication and RLS policies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  },
});

// Export types for TypeScript
export type SupabaseClient = typeof supabase;


