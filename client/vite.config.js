import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IPs (necessary for mobile access)
    port: 5173,      // Keep the same port or change it if needed
  },
})
