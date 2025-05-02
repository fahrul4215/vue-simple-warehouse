<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow mb-4">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/products" class="text-xl  font-semibold text-gray-800">
              Warehouse
            </router-link>
            <router-link to="/dashboard" class="ml-4 text-sm text-gray-600 hover:text-gray-800">
              Dashboard
            </router-link>
            <router-link to="/products" class="ml-4 text-sm text-gray-600 hover:text-gray-800">
              Products
            </router-link>
          </div>
          <div class="flex items-center">
            <button @click="logout" class="text-sm text-gray-600 hover:text-gray-800">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push('/login');
}
</script>

<style>
/* global styles can go here */
</style>
