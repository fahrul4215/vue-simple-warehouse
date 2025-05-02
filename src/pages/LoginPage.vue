<template>
    <div class="max-w-sm mx-auto mt-20">
        <h1 class="text-2xl mb-4">Login</h1>
        <form @submit.prevent="onSubmit" novalidate>
            <div class="mb-4">
                <label for="username" class="block text-sm font-medium mb-1">Username *</label>
                <input id="username" v-model="form.username" required class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': errorMessages.username }" placeholder="Username" />
                <p v-if="errorMessages.username" class="text-red-600 text-sm mt-1">
                    {{ errorMessages.username }}
                </p>
            </div>

            <div class="mb-4">
                <label for="password" class="block text-sm font-medium mb-1">Password *</label>
                <input id="password" v-model="form.password" type="password" required class="w-full p-2 border rounded"
                    :class="{ 'border-red-500': errorMessages.password }" placeholder="Password" />
                <p v-if="errorMessages.password" class="text-red-600 text-sm mt-1">
                    {{ errorMessages.password }}
                </p>
            </div>

            <button type="submit" class="w-full p-2 bg-blue-600 text-white rounded" :disabled="submitting">
                {{ submitting ? 'Logging in...' : 'Log In' }}
            </button>

            <p v-if="generalError" class="text-red-600 text-sm mt-4">{{ generalError }}</p>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

// Form state
const form = reactive({ username: '', password: '' });
const errorMessages = reactive({ username: '', password: '' });
const generalError = ref('');
const submitting = ref(false);

const auth = useAuthStore();
const router = useRouter();

function clearErrors() {
    generalError.value = '';
    errorMessages.username = '';
    errorMessages.password = '';
}

async function onSubmit() {
    clearErrors();
    submitting.value = true;
    try {
        // Attempt login
        await auth.login({ username: form.username, password: form.password });
        router.push('/products');
    } catch (e) {
        const details = e.response?.data?.details;
        if (details && typeof details === 'object') {
            Object.entries(details).forEach(([field, msg]) => {
                if (errorMessages[field] !== undefined) {
                    errorMessages[field] = msg;
                }
            });
        } else {
            generalError.value = e.response?.data?.error || 'Login failed';
        }
    } finally {
        submitting.value = false;
    }
}
</script>

<style scoped>
/* scoped styles if needed */
</style>