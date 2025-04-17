import type { RequestHandler  } from '@sveltejs/kit';
import { redirect  } from '@sveltejs/kit';
import { OAUTH_DOMAIN, OAUTH_CLIENT_ID } from '$env/static/private';

export const GET: RequestHandler = ({ cookies }) => {
  cookies.delete('session', { path: '/' });
  const returnTo = encodeURIComponent('http://localhost:5173/login');
  throw redirect(
    302,
    `https://${OAUTH_DOMAIN}/v2/logout?client_id=${OAUTH_CLIENT_ID}&returnTo=${returnTo}`
  );
}