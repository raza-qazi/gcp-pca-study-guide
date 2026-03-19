import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to match your GitHub repo name exactly
// e.g. base: '/cloud-study-guide/'
export default defineConfig({
  plugins: [react()],
  base: '/gcp-pca-study-guide/',
})
