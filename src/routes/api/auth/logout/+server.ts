import { redirect, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';



export const POST: RequestHandler = async ({ cookies, request }) => {
  cookies.delete('refresh_token', { path: '/' });
  cookies.delete('access_token', { path: '/' });
  if (request.headers.get('accept') === 'application/json') {

    return json({ success: true })
  }
  throw redirect(303, '/login');
}
