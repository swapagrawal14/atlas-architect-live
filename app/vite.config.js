import { sveltekit } from '@sveltejs/kit/vite';
import wasmPack from 'vite-plugin-wasm-pack';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    wasmPack(['../generator']) // path to your Rust WASM crate
  ]
});
