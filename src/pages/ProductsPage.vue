<template>
    <div class="p-4">
        <h1 class="text-2xl mb-4">Products</h1>
        <div class="flex gap-2 mb-4">
            <input v-model="filters.search" placeholder="Search..." @keyup.enter="fetch" class="p-2 border" />
            <input v-model.number="filters.min_qty" type="number" placeholder="Min Qty" @keyup.enter="fetch"
                class="p-2 border w-24" />
            <select v-model="filters.status" @change="fetch" class="p-2 border w-32">
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>
            <button @click="fetch" class="p-2 bg-gray-200">Filter</button>
            <button @click="exportCSV" class="p-2 bg-green-200">Export CSV</button>
            <button @click="showForm = true" class="ml-auto p-2 bg-blue-500 text-white">New Product</button>
        </div>

        <ProductList :products="items" :loading="loading" :formatRupiah="formatRupiah" :apiBase="apiBase" @edit="onEdit" @delete="onDelete"  />
        <Pagination :meta="meta" @change-page="onPageChange" />

        <ProductForm v-if="showForm" @close="onClose" @saved="onSaved" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useProductsStore } from '../store/products';
import ProductList from '../components/ProductList.vue';
import Pagination from '../components/Pagination.vue';
import ProductForm from '../components/ProductForm.vue';
import { exportProductsCSV } from '../services/products';
import { formatRupiah } from '../utils/format';
import { storeToRefs } from 'pinia';

const store = useProductsStore();
const showForm = ref(false);

const { items, meta, loading, filters } = storeToRefs(store);
const apiBase = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')

function fetch() {
    store.fetch();
}

function onPageChange(page) {
    store.meta.page = page;
    fetch();
}

async function exportCSV() {
    const res = await exportProductsCSV(filters);
    const blob = new Blob([res.data], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'products.csv';
    a.click();
    URL.revokeObjectURL(url);
}

function onClose() { showForm.value = false; }
function onSaved() { showForm.value = false; fetch(); }

async function onEdit(product) {
    showForm.value = true;
    store.setItem(product);
}

async function onDelete(product) {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
        await store.delete(product.id);
        fetch();
    }
}

onMounted(fetch);
</script>