import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { SupabaseMMKVStorage } from '../../../storage/adapters/SupabaseMMKVStorage';
import { Database } from "./types";

const supabaseEnvSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

const { url, key } = supabaseEnvSchema.parse({
  url: process.env.EXPO_PUBLIC_SUPABASE_URL,
  key: process.env.EXPO_PUBLIC_SUPABASE_KEY,
});

export const supabase = createClient<Database>(url, key, {
  auth: {
    storage: SupabaseMMKVStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
