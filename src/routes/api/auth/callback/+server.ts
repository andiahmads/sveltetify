import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { SPOTIFY_APP_CLIENT_ID, BASE_URL, SPOTIFY_APP_CLIENT_SECRET } from '$env/static/private';



export const GET: RequestHandler = async ({ url, cookies, fetch }) => {
  const code = url.searchParams.get('code') || null;
  const state = url.searchParams.get('state') || null;


  const storedState = cookies.get('spotify_auth_state') || null;
  const storedChallengeVerifier = cookies.get('spotify_auth_challenge_verifier') || null;

  if (state === null || state !== storedState) {
    throw error(400, 'state_mismatch');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`)}`
    },
    body: new URLSearchParams({
      code: code || '',
      redirect_uri: `${BASE_URL}/api/auth/callback`,
      grant_type: 'authorization_code',
      code_verifier: storedChallengeVerifier || '',
      client_id: SPOTIFY_APP_CLIENT_ID,

    })
  });
  const responseJSON = await response.json();

  if (responseJSON.error) {
    throw error(400, responseJSON.error_description);
  }

  cookies.delete('spotify_auth_state', { path: '/' })
  cookies.delete('spotify_auth_challenge_verifier', { path: '/' })
  cookies.set('refresh_token', responseJSON.refresh_token, { path: '/' });
  cookies.set('access_token', responseJSON.access_token, { path: '/' });

  throw redirect(303, '/');
}









