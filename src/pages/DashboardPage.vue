<template>
    <div class="p-4">
        <h1 class="text-2xl mb-6">Dashboard</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Total Products -->
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-lg font-medium">Total Products</h2>
                <p class="text-3xl font-bold mt-2">{{ metrics.total_products }}</p>
            </div>

            <!-- Total Stock -->
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-lg font-medium">Total Stock</h2>
                <p class="text-3xl font-bold mt-2">{{ metrics.total_stock }}</p>
            </div>

            <!-- Low Stock Items -->
            <div class="bg-white p-4 rounded shadow">
                <h2 class="text-lg font-medium">Low Stock Items</h2>
                <p class="text-3xl font-bold mt-2 text-red-600">{{ metrics.low_stock_count }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { useDashboardStore } from '../store/dashboard';
const store = useDashboardStore();
const metrics = reactive({ total_products: 0, total_stock: 0, low_stock_count: 0 });

async function fetchMetrics() {
    try {
        const data = await store.fetch();
        metrics.total_products = data.total_products;
        metrics.total_stock = data.total_stock;
        metrics.low_stock_count = data.low_stock_count;
    } catch (e) {
        console.error('Failed to fetch dashboard metrics', e);
    }
}

onMounted(fetchMetrics);
</script>

<style scoped>
/* add styling if desired */
</style>