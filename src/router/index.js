import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';

export const isLoading = ref(false);

const routes = [
    // Auth routes (no layout)
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/auth/Login.vue'),
        meta: { guest: true },
    },
    // App routes (with layout)
    {
        path: '/',
        component: () => import('@/layout/AppLayout.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/pages/Dashboard.vue'),
                meta: { title: 'Dashboard' },
            },
        ],
    },

    // 404
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'not-found',
    //     component: () => import('@/pages/NotFound.vue'),
    // },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

// Navigation guards
router.beforeEach((to, from, next) => {
    isLoading.value = true;

    const token = localStorage.getItem('auth_token');

    // If route requires auth and no token
    if (!to.meta.guest && !token && to.name !== 'login') {
        // For demo purposes, allow access without login
        // In production: return next({ name: 'login' });
    }

    // If logged in and trying to access guest route
    if (to.meta.guest && token) {
        return next({ name: 'dashboard' });
    }
    next();
});

router.afterEach(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 300);
});

export default router;