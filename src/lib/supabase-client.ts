import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database.types';

const SUPABASE_URL = "https://fhnlzwtpyzzjptvpwrlv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobmx6d3RweXp6anB0dnB3cmx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEzNTI1NjYsImV4cCI6MjA2NjkyODU2Nn0.I9_UuRsaYWHbPKsyYiRwpD_O8CJyJAph-qYzrbfk8yQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});