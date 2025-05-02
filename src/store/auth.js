import { defineStore } from 'pinia';
import { login as loginApi } from '../services/auth';
import router from '../router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || '',
    }),
    actions: {
        async login(creds) {
            const res = await loginApi(creds);
            this.token = res.data.token;
            localStorage.setItem('token', this.token);
            router.push('/products');
        },
        logout() {
            this.token = '';
            localStorage.removeItem('token');
            router.push('/login');
        },
    },
});
