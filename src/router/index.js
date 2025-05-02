import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';
import LoginPage from '../pages/LoginPage.vue';
import ProductsPage from '../pages/ProductsPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';

const routes = [
    { path: '/login', component: LoginPage },
    {
        path: '/products',
        component: ProductsPage,
        meta: { requiresAuth: true },
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        meta: { requiresAuth: true }
    },
    { path: '/', redirect: '/products' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Protect routes
router.beforeEach((to, _, next) => {
    const auth = useAuthStore();
    if (to.meta.requiresAuth && !auth.token) {
        return next('/login');
    }
    next();
});

export default router;
