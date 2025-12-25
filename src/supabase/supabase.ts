import { createClient } from '@supabase/supabase-js';
import 'expo-sqlite/localStorage/install';
import { z } from 'zod';

const supabaseEnvSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

const { url, key } = supabaseEnvSchema.parse({
  url: process.env.EXPO_PUBLIC_SUPABASE_URL,
  key: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

export const supabase = createClient(url, key, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
