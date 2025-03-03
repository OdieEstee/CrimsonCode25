import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
          name: 'Project EZD',
          short_name: 'EZD',
          description: 'A creative art tool using math functions',
          theme_color: '#ffffff',
          icons: [
              {
                src: '/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: '/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
              }
          ]
      }
    })
  ],
})
