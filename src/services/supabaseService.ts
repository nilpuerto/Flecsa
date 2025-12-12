/**
 * Supabase Service
 * 
 * This service provides a secure interface to interact with Supabase.
 * All database operations use Row Level Security (RLS) policies for protection.
 * 
 * Usage:
 * import { supabaseService } from '@/services/supabaseService';
 * 
 * // Get files for current user
 * const files = await supabaseService.getFiles();
 * 
 * // Upload a file
 * const result = await supabaseService.uploadFile(file, metadata);
 */

import { supabase } from '@/lib/supabase';

export interface FileMetadata {
  filename: string;
  mime_type?: string;
  size_bytes: number;
  type?: string;
  title?: string;
  summary?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

export interface FileRecord {
  id: string;
  user_id: string;
  filename: string;
  mime_type?: string;
  s3_key: string;
  size_bytes: number;
  status: 'pending' | 'processing' | 'organized' | 'error';
  type?: string;
  title?: string;
  summary?: string;
  tags?: string[];
  metadata?: Record<string, any>;
  created_at: string;
  processed_at?: string;
  locked: boolean;
}

class SupabaseService {
  /**
   * Get the current authenticated user
   */
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  /**
   * Get user profile from users table
   */
  async getUserProfile() {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Get all files for the current user
   */
  async getFiles(limit = 50, offset = 0) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data as FileRecord[];
  }

  /**
   * Get a single file by ID
   */
  async getFile(fileId: string) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('id', fileId)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    return data as FileRecord;
  }

  /**
   * Create a file record in the database
   * Note: This creates the database record. File upload to storage should be done separately.
   */
  async createFileRecord(metadata: FileMetadata, s3Key: string) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('files')
      .insert({
        user_id: user.id,
        filename: metadata.filename,
        mime_type: metadata.mime_type,
        s3_key: s3Key,
        size_bytes: metadata.size_bytes,
        status: 'pending',
        type: metadata.type,
        title: metadata.title,
        summary: metadata.summary,
        tags: metadata.tags || [],
        metadata: metadata.metadata || {},
      })
      .select()
      .single();

    if (error) throw error;
    return data as FileRecord;
  }

  /**
   * Update a file record
   */
  async updateFile(fileId: string, updates: Partial<FileMetadata>) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('files')
      .update(updates)
      .eq('id', fileId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as FileRecord;
  }

  /**
   * Delete a file record
   */
  async deleteFile(fileId: string) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('files')
      .delete()
      .eq('id', fileId)
      .eq('user_id', user.id);

    if (error) throw error;
  }

  /**
   * Search files using full-text search
   */
  async searchFiles(query: string, limit = 20) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('files')
      .select('*')
      .eq('user_id', user.id)
      .or(`filename.ilike.%${query}%,title.ilike.%${query}%,summary.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data as FileRecord[];
  }

  /**
   * Get user's credits
   */
  async getUserCredits() {
    const profile = await this.getUserProfile();
    return {
      credits: profile.credits,
      plan_id: profile.plan_id,
      credits_reset: profile.credits_reset,
    };
  }

  /**
   * Get available plans
   */
  async getPlans() {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .order('price_cents', { ascending: true });

    if (error) throw error;
    return data;
  }
}

export const supabaseService = new SupabaseService();
export default supabaseService;


