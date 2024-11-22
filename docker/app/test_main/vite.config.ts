import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"./",
  plugins: [react()],
  server: {
    // External Publication
    host: '0.0.0.0',
    // You can change the port for starting up.
    port: 5173,
    hmr: true, // HMR を有効にする
    watch: {
      usePolling: true, // ファイル変更をポーリングで監視
    },
    proxy: {
      '/api': {
        target: 'http://localhost:80', // バックエンドのURL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
