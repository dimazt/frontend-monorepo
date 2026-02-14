<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApplicationLogo from '@/components/Logo/ApplicationLogo.vue';
import { Button } from 'primevue';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const menu = ref(null);
const router = useRouter();

const overlayMenuItems = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        command: () => {
            router.push({ name: 'user.profile' });
        }
    },
    {
        separator: true
    },
    {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
            localStorage.clear(); // Contoh untuk logout, hapus token atau data
            sessionStorage.clear();
            router.push('/auth/login'); // Redirect ke halaman login
        }
    }
];
function toggleMenu(event) {
    menu.value.toggle(event);
}
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <!-- <router-link to="/" class="layout-topbar-logo">
                <ApplicationLogo />
                <span class="font-bold">Eagleshift</span>
            </router-link> -->
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <Menu ref="menu" :model="overlayMenuItems" :popup="true" class="mt-5" />
                </div>
            </div>
            <Button
                v-if="$pwa.canInstall"
                @click="$pwa.install()"
                class="flex items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 hover:from-emerald-600 hover:to-teal-700 active:scale-95 transition-all duration-200 text-sm"
            >
                <i class="pi pi-download"></i>
                <span class="hidden lg:block">Install</span>
            </Button>
            <button type="button" class="layout-topbar-action">
                <i class="pi pi-bell"></i>
                <span>Messages</span>
            </button>
            <button type="button" class="layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
        </div>
    </div>
</template>
