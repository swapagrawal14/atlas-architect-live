import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/atlas-architect-live/', // <-- Use your repo name here!
});
