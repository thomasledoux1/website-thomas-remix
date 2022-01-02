import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const getAccessToken = async () => {
  const accessTokens = await supabase.from('access_tokens');
  return accessTokens.data?.[0];
};

export const updateAccessToken = (token: {
  id: string;
  access_token: string;
  refresh_token: string;
  expiration_token: string;
}) => {
  supabase.from('access_tokens').update(token);
};
