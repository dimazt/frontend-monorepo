import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import { createPinia } from 'pinia';
import { initializeAuthStore } from './stores/authStore';
import authDirective from './directives/authDirective';
import pwaInstall from './plugins/install_pwa';

async function clearService() {
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (let registration of registrations) {
            await registration.unregister();
        }
    }
    if ('caches' in window) {
        const names = await caches.keys();
        for (let name of names) {
            await caches.delete(name);
        }
    }
}

async function init() {
    await clearService();

    const app = createApp(App);
    const pinia = createPinia();

    app.use(router);
    app.use(PrimeVue, {
        ripple: true,
        theme: {
            preset: Aura,
            options: {
                menuMode: 'overlay',
                darkModeSelector: '.app-dark',
            },
        },
    });
    app.use(ToastService);
    app.use(pinia);
    app.use(authDirective);
    app.use(ConfirmationService);
    app.use(pwaInstall);

    const isAuthenticated = await initializeAuthStore();
    if (isAuthenticated) {
        console.log('User session restored');
    } else {
        console.log('No valid session found');
    }

    app.mount('#app');
}

init();