import type { RequestHandler  } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import {OAUTH_CLIENT_ID, OAUTH_AUTHORIZE_URL} from '$env/static/private';

export const GET: RequestHandler = ({ url }) => {
  const origin = url.origin;
  const redirectUri = `${origin}/api/auth/callback`;
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: OAUTH_CLIENT_ID,
    redirect_uri: redirectUri,
    state: crypto.randomUUID(),
    scope: 'openid profile email'
  });
  
  throw redirect(302,`${OAUTH_AUTHORIZE_URL}?${params}`);
}