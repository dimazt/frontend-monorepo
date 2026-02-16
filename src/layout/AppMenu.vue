<script setup>
import { ref, computed, onMounted, defineEmits } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { Skeleton, Avatar } from 'primevue';
import ApplicationLogo from '@/components/logo/ApplicationLogo.vue';
import menu from '@/helpers/menu';
import { useAuth } from '@/composables/useAuth';
import { getInitials } from '@/helpers/general_helper';
import { useRouter } from 'vue-router';

const emit = defineEmits(['menu-click']);
const menus = ref([]);
const searchQuery = ref('');
const loading = ref(true);
const router = useRouter();
const { user } = useAuth();

const getMenuData = async () => {
    return menu;
};

onMounted(async () => {
    try {
        loading.value = true;
        menus.value = await getMenuData();
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
});

const filteredMenus = computed(() => {
    if (!searchQuery.value) return menus.value;
    const query = searchQuery.value.toLowerCase();
    return menus.value
        .map((m) => {
            const mainMatch = m.name.toLowerCase().includes(query);
            let filteredSub = [];
            if (m.submenu && Array.isArray(m.submenu)) {
                filteredSub = m.submenu.filter((sub) => sub.name.toLowerCase().includes(query));
            }
            if (mainMatch || filteredSub.length > 0) {
                return { ...m, submenu: mainMatch ? m.submenu : filteredSub };
            }
            return null;
        })
        .filter(Boolean);
});

function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    router.push('/auth/login');
}
</script>

<template>
    <div class="mobile-menu-container">
        <!-- Logo -->
        <div class="menu-logo-area">
            <ApplicationLogo class="w-36" />
        </div>

        <!-- User Profile -->
        <div class="menu-user-card">
            <div class="menu-user-avatar-wrap">
                <Avatar v-if="user.avatar" :image="user.avatar" size="large" shape="circle" />
                <Avatar v-else :label="getInitials(user.name)" size="large" shape="circle" class="menu-avatar-fallback" />
                <span class="menu-user-status"></span>
            </div>
            <div class="menu-user-info">
                <p class="menu-user-name">{{ user.name }}</p>
                <p class="menu-user-email">{{ user.email }}</p>
            </div>
        </div>

        <!-- Search -->
        <div class="menu-search-wrap">
            <div class="menu-search-inner">
                <i class="pi pi-search menu-search-icon"></i>
                <input v-model="searchQuery" type="text" placeholder="Cari menu..." class="menu-search-input" />
                <button v-if="searchQuery" @click="searchQuery = ''" class="menu-search-clear">
                    <i class="pi pi-times"></i>
                </button>
            </div>
        </div>

        <!-- Menu Items -->
        <nav class="menu-nav">
            <ul class="layout-menu">
                <template v-if="loading">
                    <li v-for="n in 5" :key="n" class="skeleton-item">
                        <Skeleton width="75%" height="1.25rem" class="mb-2" />
                        <Skeleton width="55%" height="0.85rem" />
                    </li>
                </template>
                <template v-else>
                    <template v-for="(item, i) in filteredMenus" :key="item.id || i">
                        <app-menu-item v-if="!item.separator" :item="item" :index="i" />
                        <li v-if="item.separator" class="menu-divider"></li>
                    </template>
                    <li v-if="!filteredMenus.length" class="menu-empty">
                        <i class="pi pi-search"></i>
                        <span>Menu tidak ditemukan</span>
                    </li>
                </template>
            </ul>
        </nav>

        <!-- Logout -->
        <div class="menu-footer">
            <button class="menu-logout-btn" @click="handleLogout">
                <i class="pi pi-sign-out"></i>
                <span>Keluar</span>
            </button>
            <p class="menu-version">Smart LV v1.0 &bull; MGE</p>
        </div>
    </div>
</template>

<style scoped>
.mobile-menu-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100dvh;
    padding-bottom: env(safe-area-inset-bottom, 0);
}

/* Logo */
.menu-logo-area {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 1rem 0.75rem 1rem;
}

/* User Card */
.menu-user-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 0 0.75rem;
    padding: 0.875rem;
    background: var(--surface-50, #f8fafc);
    border-radius: 12px;
    border: 1px solid var(--surface-border);
}
.menu-user-avatar-wrap {
    position: relative;
    flex-shrink: 0;
}
.menu-avatar-fallback {
    background: linear-gradient(135deg, var(--primary-color), #047857) !important;
    color: white !important;
    font-weight: 700;
}
.menu-user-status {
    position: absolute;
    bottom: 1px;
    right: 1px;
    width: 10px;
    height: 10px;
    background: #22c55e;
    border: 2px solid var(--surface-card);
    border-radius: 50%;
}
.menu-user-info {
    flex: 1;
    min-width: 0;
}
.menu-user-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-color);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.menu-user-email {
    font-size: 0.7rem;
    color: var(--text-color-secondary);
    margin: 0.15rem 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* Search */
.menu-search-wrap {
    padding: 0.75rem;
    position: sticky;
    top: 0;
    z-index: 5;
    background: var(--surface-card);
}
.menu-search-inner {
    position: relative;
    display: flex;
    align-items: center;
}
.menu-search-icon {
    position: absolute;
    left: 0.75rem;
    font-size: 0.8rem;
    color: var(--text-color-secondary);
}
.menu-search-input {
    width: 100%;
    padding: 0.6rem 2.25rem 0.6rem 2.25rem;
    border-radius: 10px;
    border: 1px solid var(--surface-border);
    background: var(--surface-ground);
    font-size: 0.8rem;
    color: var(--text-color);
    outline: none;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
}
.menu-search-input:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
}
.menu-search-input::placeholder {
    color: var(--text-color-secondary);
}
.menu-search-clear {
    position: absolute;
    right: 0.25rem;
    width: 1.75rem;
    height: 1.75rem;
    border: none;
    background: transparent;
    color: var(--text-color-secondary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
}
.menu-search-clear:active {
    background: var(--surface-100);
}

/* Nav */
.menu-nav {
    flex: 1;
    padding: 0 0.5rem;
    overflow-y: auto;
}

.skeleton-item {
    padding: 0.75rem;
}

.menu-divider {
    border-top: 1px solid var(--surface-border);
    margin: 0.5rem 0.75rem;
    list-style: none;
}

.menu-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 2rem 1rem;
    color: var(--text-color-secondary);
    font-size: 0.8rem;
    list-style: none;
}
.menu-empty i {
    font-size: 1.25rem;
}

/* Footer / Logout */
.menu-footer {
    padding: 0.75rem;
    border-top: 1px solid var(--surface-border);
    margin-top: auto;
}
.menu-logout-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.7rem 0.875rem;
    border-radius: 10px;
    border: none;
    background: #fef2f2;
    color: #dc2626;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s;
}
.menu-logout-btn:active {
    background: #fecaca;
}
.menu-version {
    font-size: 0.65rem;
    color: var(--text-color-secondary);
    text-align: center;
    margin: 0.75rem 0 0 0;
}
</style>