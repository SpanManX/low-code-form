import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
    plugins: [vue(), svgLoader()],
    base: './',
    build: {
        lib: {
            entry: fileURLToPath(new URL('./src/index.js', import.meta.url)),
            /**
             * 构建 xxx.umd.js 文件时导出的全局变量名
             * 也就是说，如果用户在浏览器直接通过 <script src="..."> 引入这个包，可以在 window.lowCodeForm 上拿到你的组件。
             * <script src="low-code-form.umd.js"></script>
             * <script>
             *   const app = Vue.createApp({})
             *   app.use(lowCodeForm)
             * </script>
             **/
            name: 'lowCodeForm',
            fileName: (format) => `low-code-form.${format}.js`
        },
        rollupOptions: {
            external: ['vue', 'element-plus'],  // 防止重复打包依赖
            output: {
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus'
                }
            }
        }
    },
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
