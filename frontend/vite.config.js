import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    // If we are running locally with 'npm run dev', use root path '/'
    // If we are building for production, use the GitHub Pages repository path
    base: command === 'serve' ? '/' : '/orbitweb-Tech/',
  }
})