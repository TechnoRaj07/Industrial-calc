import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  'https://txfxinxhqmeopjscanyz.supabase.co';

const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_Iu_k8_IGal5pK8dGET3p4w_lAv95L_X';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_KEY.length > 5);
};
