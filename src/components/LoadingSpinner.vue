<template>
    <div class="loading-spinner-wrapper">
        <div class="spinner-ring"></div>
    </div>
</template>

<style scoped>
.loading-spinner-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
}
.spinner-ring {
    width: 40px;
    height: 40px;
    border: 3px solid var(--surface-border, #e2e8f0);
    border-top-color: var(--primary-color, #10b981);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
</style>