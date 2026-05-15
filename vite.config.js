import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/antiguedades-sthandier/', // Cambia 'proyecto' por el nombre de tu repo si es diferente
})
