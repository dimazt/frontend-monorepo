import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';

/**
 * Composable for auth state - use in components
 */
export function useAuth() {
    const store = useAuthStore();

    const user = computed(() => store.user);
    const isAuthenticated = computed(() => store.isAuthenticated);
    const token = computed(() => store.token);

    function login(tokenValue, userData) {
        store.setToken(tokenValue);
        store.setUser(userData);
    }

    function logout() {
        store.logout();
    }

    function hasRole(role) {
        return store.user.role === role;
    }

    function hasAnyRole(roles = []) {
        return roles.includes(store.user.role);
    }

    return {
        user,
        isAuthenticated,
        token,
        login,
        logout,
        hasRole,
        hasAnyRole,
    };
}