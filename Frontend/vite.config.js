import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173, 
    strictPort: true, // Prevents Vite from trying other ports if 5173 is busy
    open: true,
  },
  plugins: [react(),tailwindcss()],
 
})
