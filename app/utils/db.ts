/* import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        type: 'service_account',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
          'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j3bwb%40personal-website-e4e38.iam.gserviceaccount.com',
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_id: process.env.CLIENT_EMAIL,
        client_email: process.env.CLIENT_EMAIL,
      }),
    });
  } catch (error) {
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();
 */

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
}) => {
  supabase.from('access_tokens').update(token);
};
