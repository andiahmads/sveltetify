import { redirect } from "@sveltejs/kit";
import type { LayoutLoad, LayoutServerLoad } from './$types';




// export const load: LayoutLoad = ({ data, url }) => {
//   const { user } = data || {};
//   if (user && url.pathname === '/login') {
//     throw redirect(307, '/');
//   }
//
//   if (!user && url.pathname === '/login') {
//     throw redirect(307, '/login');
//   }
//
//   return {
//     user
//   }
// }


export const load: LayoutServerLoad = async ({ data, url }) => {
  // Ambil user dari cookies atau sumber autentikasi
  // const user = cookies.get('spotify_user') ? JSON.parse(cookies.get('spotify_user')) : null;
  const { user } = data || {};


  // Jika sudah login dan mencoba akses /login, redirect ke /
  if (user && url.pathname === '/login') {
    throw redirect(307, '/');
  }

  // Jika belum login dan bukan di /login, redirect ke /login
  if (!user && url.pathname !== '/login') {
    throw redirect(307, '/login');
  }

  // Kembalikan data untuk layout dan halaman
  return {
    user
  };
};


