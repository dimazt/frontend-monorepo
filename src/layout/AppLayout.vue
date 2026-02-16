<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppSidebar from './AppSidebar.vue';
import AppBottomNav from './AppBottomNav.vue';
import Toast from 'primevue/toast';

const { isSidebarActive, closeSidebar } = useLayout();

function onMaskClick() {
    closeSidebar();
}

const wrapperClass = computed(() => ({
    'layout-mobile': true,
    'layout-sidebar-active': isSidebarActive.value,
}));
</script>

<template>
    <div class="layout-wrapper" :class="wrapperClass">
        <!-- 1. Topbar — fixed at top of flex -->
        <AppTopbar />

        <!-- 2. Scrollable content area -->
        <div class="layout-main-container layout-scroll-area">
            <div class="layout-main">
                <Toast />
                <router-view />
            </div>
        </div>

        <!-- 3. Bottom nav — fixed at bottom of flex -->
        <AppBottomNav />

        <!-- Sidebar overlay (absolute within 480px wrapper) -->
        <transition name="sidebar-mask">
            <div v-if="isSidebarActive" class="layout-mask" @click="onMaskClick"></div>
        </transition>
        <AppSidebar />
    </div>
    <Toast />
</template>

<style scoped>
/* Mask — absolute within the wrapper so it stays inside 480px frame */
.layout-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.45);
    z-index: 998;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
}

.sidebar-mask-enter-active {
    transition: opacity 0.25s ease;
}
.sidebar-mask-leave-active {
    transition: opacity 0.2s ease;
}
.sidebar-mask-enter-from,
.sidebar-mask-leave-to {
    opacity: 0;
}
</style>