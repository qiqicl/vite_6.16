import {
    defineConfig
} from 'vite'
import { resolve } from 'path'
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                nested: resolve(__dirname, 'src/nested/index.html')
            }
        },
        assetsDir: './',
        sourcemap: true,
        emptyOutDir:true
    },
    // 配置开发服务器
    server: {
        port: 8001,
        open: true,
        hmr: false,
        proxy: {
            // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
            '/api': {
                target: 'http://121.89.213.194:5001/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        }
    },
})