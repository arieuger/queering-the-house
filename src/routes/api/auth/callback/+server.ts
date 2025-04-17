import type { RequestHandler } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';
import { OAUTH_TOKEN_URL, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_USERINFO_URL, OAUTH_AUDIENCE } from '$env/static/private';

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
      scope: 'openid profile email',
      audience: OAUTH_AUDIENCE
    })
  });
  
  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    console.error('Token endpoint failed', tokenRes.status, text);
    throw error(500, 'Error al obtener tokens');
  } 
  const { access_token } = await tokenRes.json();
  
  const profileRes = await fetch(OAUTH_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`, 
      Accept:        'application/json'
    }
  });
  
  
  if (!profileRes.ok) {
    const text = await profileRes.text();
    console.error('Userinfo endpoint failed', profileRes.status, text);
    throw error(500, 'Error al obtener perfil de usuario');
  }
  const user = await profileRes.json();
  
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