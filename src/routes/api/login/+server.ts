import type { RequestHandler } from '@sveltejs/kit';
import { json, error } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { username, password } = await request.json() as {
    username: string;
    password: string;
  }

  if (username === 'admin' && password === 'admin') {
    const user = { username: 'admin', roles: ['admin'] };

    cookies.set('session', JSON.stringify(user), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production',
      secure: false,
      maxAge: 60 * 60 * 24 // 24h
    });

    return json( { success: true });
  }

  throw error(401, 'Invalid credentials');
}