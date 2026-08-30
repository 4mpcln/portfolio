import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom', '@react-three/fiber'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['@react-three/fiber', '@react-three/drei', '@react-three/rapier', 'three'],
  },
  server: {
    port: 3000,
    open: true,
  },
})
