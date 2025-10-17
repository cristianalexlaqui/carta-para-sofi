// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 👈 USAR LA RUTA ABSOLUTA DEL REPOSITORIO
  base: '/carta-para-sofi/', 
})