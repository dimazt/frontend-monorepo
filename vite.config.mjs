import { fileURLToPath, URL } from 'node:url';

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        noDiscovery: true,
    },
    plugins: [
        vue(),
        Components({
            resolvers: [PrimeVueResolver()]
        }),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Eagleshift',
                short_name: 'Eagleshift',
                start_url: '.',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#42b983',
                icons: [
                    {
                        src: '/icons/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/icons/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        }
    }
});
