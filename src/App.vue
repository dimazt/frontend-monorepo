<template>
    <div id="app">
        <transition name="fade">
            <div v-if="isLoading" class="loader-overlay">
               <Dialog :visible="isLoading" modal header="Mohon menunggu..." :style="{ width: '20rem' }" :breakpoints="{ '1199px': '75vw', '575px': '75vw' }" :closable="false">
                <div class="flex justify-center text-center overflow-hidden">
                    <div class="relative h-[100px] w-[100px]">
                        <img src="/logo-mge.png" class="absolute inset-0 z-10 m-auto w-[50px]" alt="Logo" />
                        <ProgressSpinner class="h-full w-full" strokeWidth="4" animationDuration=".7s" aria-label="Loading..." />
                    </div>
                </div>
            </Dialog>
            </div>
        </transition>
        <router-view />

        <Toast />
    </div>
</template>

<script setup>
import { isLoading } from '@/router'; // import state loader dari router
import { Toast } from 'primevue';
import LoadingSpinner from './components/LoadingSpinner.vue';

</script>

<style>
.loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background: rgba(255, 255, 255, 0.7); */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}
.spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #42b883;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 0.8s linear infinite;
}
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
