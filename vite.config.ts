import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Cargar variables de entorno según el modo (development/production)
  // El tercer argumento '' permite cargar todas las variables, no solo las que empiezan por VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Definimos process.env para que funcione la librería de Google GenAI y nuestra lógica de Sheets
      'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
      'process.env.GOOGLE_SHEET_URL': JSON.stringify(env.VITE_GOOGLE_SHEET_URL),
    },
  }
})