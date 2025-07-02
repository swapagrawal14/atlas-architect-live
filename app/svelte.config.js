import adapter from '@sveltejs/adapter-static';

const repoName = 'my-awesome-world'; // <-- Replace with your repo name

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
