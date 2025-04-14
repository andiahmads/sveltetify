import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  // preprocess: vitePreprocess(),

  preprocess: sveltePreprocess({
    scss: {
      // prependData: `@import 'src/styles/_functions';`
      prependData: `@use 'src/styles/_functions' as *;`,
      // prependData: `@use 'src/styles/_functions' as functions;`
    },
    typescript: true

  }),

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      '$components': 'src/lib/components',
      '$assets': 'src/assets',
      '$actions': 'src/lib/actions',
    }
  }
};

export default config;
