import adapter from '@sveltejs/adapter-static';

const repoName = 'my-awesome-world'; // <-- IMPORTANT: YAHAN APNE REPO KA NAAM DALO

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    }),
    paths: {
        base: process.env.NODE_ENV === 'production' ? `/${repoName}` : ''
    }
  }
};
export default config;
