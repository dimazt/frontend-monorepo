<script setup>
import { ref, computed, onMounted } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import { Button, InputText, Skeleton, Avatar } from 'primevue';
import MenuService, { menuRepository } from '@/repositories/MenuRepository';
import ApplicationLogo from '@/components/Logo/ApplicationLogo.vue';
import menu from '@/helpers/menu';
import { useAuth } from '@/stores/composables/useAuth';

const menus = ref([]);
const searchQuery = ref('');
const loading = ref(true);

// User data - bisa diganti dengan data dari store/API
const {user} = useAuth()


const getMenuData = async () => {
    // const [response, err] = await menuRepository.list();
    // return response;
    return menu;
};

onMounted(async () => {
    try {
        loading.value = true;
        menus.value = await getMenuData();
    } catch (error) {
        console.error(error.response?.data || error);
    } finally {
        loading.value = false;
    }
});

const filteredMenus = computed(() => {
    if (!searchQuery.value) return menus.value;

    const query = searchQuery.value.toLowerCase();

    return menus.value
        .map((menu) => {
            const mainMenuMatches = menu.name.toLowerCase().includes(query);
            let filteredSubmenu = [];
            if (menu.submenu && Array.isArray(menu.submenu)) {
                filteredSubmenu = menu.submenu.filter((subItem) =>
                    subItem.name.toLowerCase().includes(query)
                );
            }
            if (mainMenuMatches || filteredSubmenu.length > 0) {
                return {
                    ...menu,
                    submenu: mainMenuMatches ? menu.submenu : filteredSubmenu
                };
            }
            return null;
        })
        .filter(Boolean);
});

function clearSearch() {
    searchQuery.value = '';
}

// Get user initial if no avatar
function getUserInitial(name) {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}
</script>

<template>
    <div class="menu-container">
        <!-- Logo -->
        <router-link to="/" class="layout-topbar-logo">
            <div class="logo-wrapper">
                <ApplicationLogo class="w-24 justify-center" />
                <!-- <span class="brand-name">Eagleshift</span> -->
            </div>
        </router-link>

        <!-- User Profile -->
        <div class="user-profile-section">
            <div class="user-avatar-wrapper">
                <Avatar v-if="user.avatar" :image="user.avatar" size="large" shape="circle" class="user-avatar" />
                <Avatar v-else :label="getUserInitial(user.name)" size="large" shape="circle"
                    class="user-avatar-initial" />
                <div class="user-status-online"></div>
            </div>
            <div class="user-info">
                <h3 class="user-name">{{ user.name }}</h3>
                <p class="user-email">{{ user.email }}</p>
            </div>
        </div>

        <!-- Search Input -->
        <div class="menu-search">
            <span class="p-input-icon-left" style="width: 100%">
                <i class="pi pi-search" />
                <InputText v-model="searchQuery" placeholder="Search menu..." class="w-full search-input" />
                <Button v-if="searchQuery" icon="pi pi-times" @click="searchQuery = ''"
                    class="p-button-text p-button-rounded clear-button" />
            </span>
        </div>

        <!-- Menu List -->
        <ul class="layout-menu">
            <!-- Tampilkan skeleton saat loading -->
            <template v-if="loading">
                <li v-for="n in 5" :key="n" class="p-2">
                    <Skeleton width="80%" height="1.5rem" class="mb-2" />
                    <Skeleton width="60%" height="1rem" />
                </li>
            </template>

            <!-- Jika sudah load -->
            <template v-else>
                <template v-for="(item, i) in filteredMenus" :key="item.id || i">
                    <app-menu-item v-if="!item.separator" :item="item" :index="i" />
                    <li v-if="item.separator" class="menu-separator"></li>
                </template>

                <li v-if="!filteredMenus.length" class="p-3 text-center">
                    No menu items found
                </li>
            </template>
        </ul>
    </div>
</template>

<style scoped>
.menu-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.layout-topbar-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem 0 0 0;
    text-decoration: none;
}

.logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.brand-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color);
    text-align: center;
}

/* User Profile Section */
.user-profile-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-bottom: 1px solid var(--surface-border);
    background: var(--surface-50);
}

.user-avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

.user-avatar {
    border: 2px solid var(--surface-card);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-avatar-initial {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
    color: #22c55e;
    font-weight: 600;
    border: 2px solid var(--surface-card);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-status-online {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    background: #22c55e;
    border: 2px solid var(--surface-card);
    border-radius: 50%;
}

.user-info {
    flex: 1;
    min-width: 0;
}

.user-name {
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0 0 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.user-email {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.menu-header {
    padding: 24px 20px;
    border-bottom: 1px solid #f3f4f6;
}

.brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    color: white;
    font-size: 18px;
}

.brand-text {
    flex: 1;
}

.brand-title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.2;
}

.brand-subtitle {
    font-size: 12px;
    color: #6b7280;
    font-weight: 500;
}

.menu-search {
    padding: 0.5rem;
    background: var(--surface-card);
    position: sticky;
    top: 0;
    z-index: 1;
    border-bottom: 1px solid var(--surface-border);
}

.menu-search .p-input-icon-left {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.menu-search .pi-search {
    position: absolute;
    left: 0.875rem;
    color: var(--text-color-secondary);
    z-index: 1;
}

.menu-search .search-input {
    width: 100%;
    padding: 0.625rem 2.75rem 0.625rem 2.5rem;
    border-radius: 8px;
    background: var(--surface-ground);
    border: 1px solid var(--surface-border);
    transition: all 0.2s ease;
    font-size: 0.875rem;
}

.menu-search .search-input:hover {
    border-color: var(--primary-color);
    background: var(--surface-card);
}

.menu-search .search-input:focus {
    box-shadow: 0 0 0 0.2rem var(--primary-100);
    border-color: var(--primary-color);
    background: var(--surface-card);
    outline: none;
}

.menu-search .clear-button {
    position: absolute;
    right: 0.25rem;
    width: 2rem;
    height: 2rem;
    padding: 0;
    color: var(--text-color-secondary);
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.menu-search .clear-button:hover {
    color: var(--primary-color);
    background: var(--primary-50);
}

.menu-separator {
    border-top: 1px solid var(--surface-border);
}
</style>