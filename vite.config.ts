import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import svgr from 'vite-plugin-svgr'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr() ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
        @use '@/shared/styles/helpers' as *;
      `,
                silenceDeprecations: ['legacy-js-api'],
            },
            less: {},
            stylus: {},
        },
    },
})
