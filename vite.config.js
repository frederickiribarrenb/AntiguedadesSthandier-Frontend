import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://frederickiribarrenb.github.io/AntiguedadesSthandier-Frontend', // Cambia 'proyecto' por el nombre de tu repo si es diferente
})
