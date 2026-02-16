import { useAuthStore } from '@/stores/authStore';

/**
 * v-auth directive
 * Usage: v-auth="'admin'" or v-auth="['admin','manager']"
 * Hides element if user doesn't have the required role
 */
const authDirective = {
    install(app) {
        app.directive('auth', {
            mounted(el, binding) {
                const store = useAuthStore();
                const requiredRoles = Array.isArray(binding.value) ? binding.value : [binding.value];

                if (!requiredRoles.includes(store.user.role)) {
                    el.style.display = 'none';
                }
            },
            updated(el, binding) {
                const store = useAuthStore();
                const requiredRoles = Array.isArray(binding.value) ? binding.value : [binding.value];

                if (!requiredRoles.includes(store.user.role)) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            },
        });
    },
};

export default authDirective;