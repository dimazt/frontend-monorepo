<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppMenu from './AppMenu.vue';

const { isSidebarActive, closeSidebar } = useLayout();
</script>

<template>
    <aside class="mobile-sidebar" :class="{ 'sidebar-open': isSidebarActive }">
        <!-- Close button -->
        <button class="sidebar-close-btn" @click="closeSidebar" aria-label="Tutup Menu">
            <i class="pi pi-times"></i>
        </button>

        <!-- Menu content -->
        <AppMenu @menu-click="closeSidebar" />
    </aside>
</template>

<style scoped>
.mobile-sidebar {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 320px;
    height: 100%;
    z-index: 999;
    background: var(--surface-card);
    overflow-y: auto;
    overflow-x: hidden;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
    box-shadow: none;
    padding: 0;
    -webkit-overflow-scrolling: touch;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: var(--surface-300);
        border-radius: 4px;
    }
    scrollbar-width: thin;
    scrollbar-color: var(--surface-300) transparent;
}

.mobile-sidebar.sidebar-open {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);
}

.sidebar-close-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background: var(--surface-100);
    color: var(--text-color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    font-size: 0.85rem;
    transition: background 0.15s;
}
.sidebar-close-btn:active {
    background: var(--surface-200);
}
</style>