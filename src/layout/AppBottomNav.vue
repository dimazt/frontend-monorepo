<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const tabs = [
    { name: 'dashboard', label: 'Home', icon: 'pi-home' },
];

function isActive(tabName) {
    if (tabName === 'dashboard' && route.name === 'dashboard') return true;
    return route.name === tabName;
}

function navigate(tabName) {
    if (route.name !== tabName) {
        router.push({ name: tabName });
    }
}
</script>

<template>
    <nav class="bottom-nav">
        <button v-for="tab in tabs" :key="tab.name"
                class="bottom-nav-item"
                :class="{
                    'is-active': isActive(tab.name),
                    'is-center': tab.isCenter,
                }"
                @click="navigate(tab.name)"
                :aria-label="tab.label || tab.name">

            <!-- Center FAB button -->
            <template v-if="tab.isCenter">
                <span class="center-fab">
                    <i :class="`pi ${tab.icon}`"></i>
                </span>
            </template>

            <!-- Normal tab -->
            <template v-else>
                <i :class="`pi ${tab.icon}`" class="nav-icon"></i>
                <span class="nav-label">{{ tab.label }}</span>
            </template>
        </button>
    </nav>
</template>

<style scoped>
.bottom-nav {
    flex-shrink: 0;
    height: 3.75rem;
    z-index: 996;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: var(--surface-card);
    border-top: 1px solid var(--surface-border);
    padding-bottom: env(safe-area-inset-bottom, 0);
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.04);
}

.bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 100%;
    border: none;
    background: transparent;
    color: var(--text-color-secondary);
    cursor: pointer;
    padding: 0;
    gap: 0.15rem;
    transition: color 0.15s;
    position: relative;
    -webkit-tap-highlight-color: transparent;
}

.bottom-nav-item:active {
    opacity: 0.7;
}

.bottom-nav-item.is-active {
    color: var(--primary-color);
}

/* Active indicator dot */
.bottom-nav-item.is-active::after {
    content: '';
    position: absolute;
    top: 2px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--primary-color);
}

.nav-icon {
    font-size: 1.15rem;
    line-height: 1;
}

.nav-label {
    font-size: 0.6rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    letter-spacing: 0.01em;
}

/* Center FAB */
.is-center {
    position: relative;
}
.is-center::after {
    display: none !important;
}

.center-fab {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), #047857);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
    margin-top: -0.75rem;
    transition: transform 0.15s, box-shadow 0.15s;
}

.is-center:active .center-fab {
    transform: scale(0.92);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
}
</style>