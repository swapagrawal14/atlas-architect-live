import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/atlas-architect-live/',  // <-- your GitHub repo name here, with leading and trailing slash
})
