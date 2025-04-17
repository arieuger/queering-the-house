import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {

  if (!locals.user) {
    // console.log("no logueado: " + locals);
    throw redirect(303, '/login');
  }

  console.log("logueado: " + locals.user.roles);

  return {user: locals.user};
}
