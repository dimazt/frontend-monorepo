<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, ref, watch } from 'vue';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';
import Toast from 'primevue/toast';
// import ErrorHandler from '@/components/P2h/ErrorHandler.vue';

const { layoutConfig, layoutState, isSidebarActive, resetMenu } = useLayout();
const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener() {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                resetMenu();
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener() {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event) {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
}
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <app-topbar :class="['layout-topbar', { 'topbar-mini-sidebar': isSidebarActive }]"></app-topbar>
        <app-sidebar :class="['layout-sidebar', { 'mini-sidebar': isSidebarActive }]"></app-sidebar>
        <div :class="['layout-main-container', { 'main-mini-sidebar': isSidebarActive }]">
            <!-- <div class="card flex flex-col gap-4">
                <div class="font-semibold text-xl">Icons</div>
                <div class="flex flex-wrap gap-2">
                    <Button icon="pi pi-star-fill" class="mr-2 mb-2"></Button>
                    <Button label="Bookmark" icon="pi pi-bookmark" class="mr-2 mb-2"></Button>
                    <Button label="Bookmark" icon="pi pi-bookmark" iconPos="right" class="mr-2 mb-2"></Button>
                </div>
            </div> -->
            <div class="layout-main">
                <Toast />
                <router-view></router-view>
                <!-- <ErrorHandler/> -->

            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask animate-fadein"></div>
    </div>
    <Toast />
</template>
