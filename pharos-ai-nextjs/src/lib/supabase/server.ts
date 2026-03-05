import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { getSupabaseServiceRoleKey, supabaseUrl } from '@/lib/supabase/env';

export const supabaseAdmin = createClient(supabaseUrl, getSupabaseServiceRoleKey(), {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
