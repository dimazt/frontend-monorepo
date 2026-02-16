/**
 * PWA Install Plugin
 * Provides $pwa global property for install prompt
 */
export default {
    install(app) {
        const pwa = {
            deferredPrompt: null,
            canInstall: false,

            async install() {
                if (!pwa.deferredPrompt) return;
                pwa.deferredPrompt.prompt();
                const { outcome } = await pwa.deferredPrompt.userChoice;
                console.log(`PWA install outcome: ${outcome}`);
                pwa.deferredPrompt = null;
                pwa.canInstall = false;
            },
        };

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            pwa.deferredPrompt = e;
            pwa.canInstall = true;
        });

        window.addEventListener('appinstalled', () => {
            pwa.deferredPrompt = null;
            pwa.canInstall = false;
            console.log('PWA installed successfully');
        });

        app.config.globalProperties.$pwa = pwa;
        app.provide('pwa', pwa);
    },
};