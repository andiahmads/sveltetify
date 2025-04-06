
import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET } from '$env/static/private';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, fetch }) => {
  const refreshToken = cookies.get('refresh_token');
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || '',
      client_id: SPOTIFY_APP_CLIENT_ID,
    }),

  });

  const responseJSON = await response.json();
  if (responseJSON.error) {
    cookies.delete('refresh_token', { path: '/' });
    cookies.delete('access_token', { path: '/' });
    throw error(401, responseJSON.error_description);
  }

  cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
  cookies.set('access_token', responseJSON.access_token, { path: '/' });
  return json(responseJSON)
}

