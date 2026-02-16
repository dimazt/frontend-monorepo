<template>
    <div class="login-page">
        <div class="login-header">
            <ApplicationLogo class="w-48 mx-auto" />
            <p class="login-subtitle">Sistem Pemesanan Kendaraan</p>
        </div>

        <div class="login-form-wrapper">
            <div class="login-form-card">
                <h2 class="login-title">Masuk</h2>

                <div class="field">
                    <label for="email">Email / NRP</label>
                    <InputText id="email" v-model="form.email" placeholder="Masukkan email atau NRP" class="w-full" />
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <Password id="password" v-model="form.password" placeholder="Masukkan password" class="w-full" :feedback="false" toggleMask />
                </div>

                <Button label="Masuk" icon="pi pi-sign-in" class="w-full mt-4" @click="handleLogin" :loading="loading" />

                <p class="login-footer-text">
                    PT Mega Global Energy &copy; {{ new Date().getFullYear() }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApplicationLogo from '@/components/Logo/ApplicationLogo.vue';

const router = useRouter();
const loading = ref(false);
const form = ref({ email: '', password: '' });

async function handleLogin() {
    loading.value = true;
    // Demo: simulate login
    setTimeout(() => {
        localStorage.setItem('auth_token', 'demo-token');
        localStorage.setItem('user_data', JSON.stringify({
            id: 1, name: 'Demo User', email: 'demo@mge.co.id', role: 'user', department: 'IT'
        }));
        router.push({ name: 'dashboard' });
        loading.value = false;
    }, 1000);
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, var(--surface-ground) 0%, var(--surface-card) 100%);
    padding: 2rem 1.5rem;
}
.login-header {
    text-align: center;
    padding-top: 3rem;
    margin-bottom: 2rem;
}
.login-subtitle {
    color: var(--text-color-secondary);
    font-size: 0.85rem;
    margin-top: 0.5rem;
}
.login-form-wrapper {
    flex: 1;
    display: flex;
    align-items: flex-start;
}
.login-form-card {
    width: 100%;
    background: var(--surface-card);
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.login-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0 0 1.5rem 0;
    color: var(--text-color);
}
.field {
    margin-bottom: 1rem;
}
.field label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 0.4rem;
}
.login-footer-text {
    text-align: center;
    font-size: 0.7rem;
    color: var(--text-color-secondary);
    margin-top: 2rem;
    margin-bottom: 0;
}
</style>