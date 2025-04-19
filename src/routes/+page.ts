import type { PageLoad } from './$types';
import { fetchRefresh } from '$helpers';

export const load: PageLoad = async ({ fetch: _fetch, parent }) => {
  const fetch = (path: string) => fetchRefresh(_fetch, path);
  const { user } = await parent();
  const newReleases = fetch('/api/spotify/browse/new-releases');
  const featuredPlaylists = fetch(`/api/spotify/browse/featured-playlists?limit=6`);
  const userPlaylists = fetch(`/api/spotify/users/${user?.id}/playlists?limit=6`);

  const catsRes = await fetch('/api/spotify/browse/categories');
  const catsResJSON: SpotifyApi.MultipleCategoriesResponse | undefined = catsRes.ok ? await catsRes.json() : undefined;


  const randomCats = catsResJSON ? catsResJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3) : [];

  const randomCatsPromise = randomCats.map(cat => fetch(`/api/spotify/browse/categories/${cat.id}/playlists?limit=6`))


  const [newReleaseRes, featurePlaylistRes, userPlaylistRes, ...randomCatsRes] = await Promise.all([
    newReleases,
    featuredPlaylists,
    userPlaylists,
    ...randomCatsPromise
  ]);

  return {
    newRelease: newReleaseRes.ok ? await newReleaseRes.json() as Promise<SpotifyApi.ListOfNewReleasesResponse> : undefined,
    featurePlaylist: featurePlaylistRes.ok ? await featurePlaylistRes.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> : undefined,
    userPlaylist: userPlaylistRes.ok ? await userPlaylistRes.json() as Promise<SpotifyApi.ListOfUsersPlaylistsResponse> : undefined,
    homeCategories: randomCats,
    categoriesPlaylists: Promise.all(randomCatsRes.map((res) => (res.ok ? res.json() as Promise<SpotifyApi.CategoryPlaylistsResponse> : undefined)))
  }
};

