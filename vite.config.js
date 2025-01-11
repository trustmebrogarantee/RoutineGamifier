/* eslint-disable no-undef */
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/RoutineGamifier/',
  resolve: {
    alias: {
      "@site": path.resolve(__dirname, "./packages/site_ui/src"),
      '@site:app': path.resolve(__dirname, './packages/site_ui/src/app'),
      '@site:pages': path.resolve(__dirname, './packages/site_ui/src/pages'),
      '@site:widgets': path.resolve(__dirname, './packages/site_ui/src/widgets'),
      '@site:features': path.resolve(__dirname, './packages/site_ui/src/features'),
      '@site:shared': path.resolve(__dirname, './packages/site_ui/src/shared'),

      '@game': path.resolve(__dirname, "./packages/game_ui/src")
    }
  },

  preview: {
    port: 5000
  },

  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'RoutineGamifier',
      short_name: 'RoutineGamifier',
      description: 'Gamify your routine',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})