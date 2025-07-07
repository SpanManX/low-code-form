import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    plugins: [vue(), svgLoader()],
    base: './',
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        port: 3000,
    }
})
