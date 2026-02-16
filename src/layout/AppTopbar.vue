<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getInitials } from '@/helpers/general_helper';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const { user } = useAuth();
const router = useRouter();
const showNotif = ref(false);

function goProfile() {
    router.push({ name: 'user.profile' });
}
</script>

<template>
    <header class="mobile-topbar">
        <!-- Left: Hamburger -->
        <button class="topbar-btn" @click="onMenuToggle" aria-label="Menu">
            <i class="pi pi-bars"></i>
        </button>

        <!-- Center: Title/Logo -->
        <div class="topbar-center">
            <span class="topbar-brand">Smart<strong>LV</strong></span>
        </div>

        <!-- Right: Actions -->
        <div class="topbar-right">
            <button class="topbar-btn topbar-btn-notif" @click="showNotif = !showNotif" aria-label="Notifikasi">
                <i class="pi pi-bell"></i>
                <span class="notif-badge">3</span>
            </button>
            <button class="topbar-avatar" @click="goProfile" aria-label="Profil">
                <span class="avatar-initial">{{ getInitials(user.name) }}</span>
            </button>
        </div>
    </header>
</template>

<style scoped>
.mobile-topbar {
    flex-shrink: 0;
    height: 3.5rem;
    z-index: 997;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.75rem;
    background: var(--surface-card);
    border-bottom: 1px solid var(--surface-border);
    padding-top: env(safe-area-inset-top, 0);
}

.topbar-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 10px;
    border: none;
    background: transparent;
    color: var(--text-color);
    font-size: 1.15rem;
    cursor: pointer;
    transition: background 0.15s;
    position: relative;
}
.topbar-btn:active {
    background: var(--surface-hover);
}

.topbar-center {
    flex: 1;
    text-align: center;
}
.topbar-brand {
    font-size: 1.05rem;
    color: var(--text-color);
    font-weight: 400;
    letter-spacing: -0.02em;
}
.topbar-brand strong {
    font-weight: 800;
    color: var(--primary-color);
}

.topbar-right {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.topbar-btn-notif {
    position: relative;
}
.notif-badge {
    position: absolute;
    top: 2px;
    right: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ef4444;
    color: white;
    font-size: 0.6rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
}

.topbar-avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid var(--primary-color);
    background: linear-gradient(135deg, var(--primary-color), #047857);
    color: white;
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
</style>