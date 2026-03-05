const missing = (name: string) => {
  throw new Error(`Missing required environment variable: ${name}`);
};

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? missing('NEXT_PUBLIC_SUPABASE_URL');
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? missing('NEXT_PUBLIC_SUPABASE_ANON_KEY');

export const getSupabaseServiceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY ?? missing('SUPABASE_SERVICE_ROLE_KEY');
