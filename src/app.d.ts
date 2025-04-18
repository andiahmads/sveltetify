// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    interface PageState {
      user: SpotifyApi.CurrentUsersProfileResponse | null;
      title?: string;
    }
    // interface Platform {}
  }
}

export { };


declare interface window {
  refreshPromise: Promise<Response> | null;
}
