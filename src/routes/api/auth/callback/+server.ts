import type { RequestHandler } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';
import { OAUTH_TOKEN_URL, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET } from '$env/static/private';
import { jwtDecode } from "jwt-decode";

export const GET: RequestHandler = async ({ url, cookies }) => {
  const origin      = url.origin;
  const redirectUri = `${origin}/api/auth/callback`;
  const code = url.searchParams.get('code');

  if (!code) throw error(400, 'Falta código de autorización');

  const tokenRes = await fetch(OAUTH_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ 
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      scope: 'openid profile email'
    })
  });

  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    console.error('Token endpoint failed', tokenRes.status, text);
    throw error(500, 'Error al obtener tokens');
  } 
  const { id_token } = await tokenRes.json();
  // console.log('id_token: ', id_token);

  interface JwtPayload {
    sub:   string;
    email?: string;
    name?:  string;
    picture?: string;
  }
  
  const user = jwtDecode<JwtPayload>(id_token);
  console.log('user: ', user);  
  
  cookies.set('session', JSON.stringify({
    id: user.sub,
    name: user.name,
    email: user.email,
    roles: ['admin']
  }), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    // secure: import.meta.env.PROD,
    secure: false,
    maxAge: 60 * 60 * 24
  });

  throw redirect(302, '/manage');
}
