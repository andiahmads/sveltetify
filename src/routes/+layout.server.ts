import { SPOTIFY_BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, url, fetch }) => {
  const accessToken = cookies.get('access_token')
  const refreshToken = cookies.get('refresh_token')
  if (!accessToken) {
    return {
      user: null,
    }
  }

  const profileResponse = await fetch(`${SPOTIFY_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }

  });
  if (profileResponse.ok) {
    const profile: SpotifyApi.CurrentUsersProfileResponse = await profileResponse.json();
    return {
      user: profile
    }
  } else if (profileResponse.status == 401 && refreshToken) {
    const refreshRes = await fetch('/api/auth/refresh', {})
    if (refreshRes.ok) {
      throw redirect(307, url.pathname)
    }
    return {
      user: null
    }
  } else {
    return {
      user: null
    }
  }
}


