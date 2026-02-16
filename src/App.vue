<template>
    <div id="app">
        <!-- Loading overlay -->
        <transition name="fade">
            <div v-if="isLoading" class="loader-overlay">
                <Dialog :visible="isLoading" modal header="Mohon menunggu..." :style="{ width: '16rem' }"
                    :closable="false">
                    <div class="flex justify-center text-center overflow-hidden">
                        <div class="relative h-[80px] w-[80px]">
                            <img src="/logo-mge.png" class="absolute inset-0 z-10 m-auto w-[36px]" alt="Logo" />
                            <ProgressSpinner class="h-full w-full" strokeWidth="4" animationDuration=".7s"
                                aria-label="Loading..." />
                        </div>
                    </div>
                </Dialog>
            </div>
        </transition>

        <router-view />
        <Toast position="top-center" />
    </div>
</template>

<script setup>
import { isLoading } from '@/router';
import { Toast } from 'primevue';
</script>

<style>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>