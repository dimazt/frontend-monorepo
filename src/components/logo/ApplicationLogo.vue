<template>
    <div class="application-logo" :class="props.class">
        <svg viewBox="0 0 200 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Truck icon -->
            <rect x="4" y="14" width="28" height="18" rx="3" fill="var(--primary-color, #10b981)" />
            <rect x="24" y="20" width="14" height="12" rx="2" fill="var(--primary-color, #059669)" />
            <circle cx="14" cy="34" r="4" fill="var(--text-color, #334155)" />
            <circle cx="32" cy="34" r="4" fill="var(--text-color, #334155)" />
            <circle cx="14" cy="34" r="2" fill="var(--surface-card, #fff)" />
            <circle cx="32" cy="34" r="2" fill="var(--surface-card, #fff)" />
            <!-- Text -->
            <text x="48" y="22" font-family="Poppins, sans-serif" font-weight="700" font-size="16" fill="var(--text-color, #0f172a)">Smart</text>
            <text x="96" y="22" font-family="Poppins, sans-serif" font-weight="700" font-size="16" fill="var(--primary-color, #10b981)">LV</text>
            <text x="48" y="36" font-family="Poppins, sans-serif" font-weight="400" font-size="8" fill="var(--text-color-secondary, #64748b)">Light Vehicle Management</text>
        </svg>
    </div>
</template>

<script setup>
const props = defineProps({
    class: {
        type: String,
        default: '',
    },
});
</script>

<style scoped>
.application-logo {
    display: flex;
    align-items: center;
}
.application-logo svg {
    width: 100%;
    height: auto;
}
</style>