<template>
    <table class="w-full table-auto border-collapse">
        <thead>
            <tr>
                <th class="border p-2">SKU</th>
                <th class="border p-2">Name</th>
                <th class="border p-2">Qty</th>
                <th class="border p-2">Price</th>
                <th class="border p-2">Barcode</th>
                <th class="border p-2">Location</th>
                <th class="border p-2">Status</th>
                <th class="border p-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="loading">
                <td colspan="6" class="text-center p-4">Loading…</td>
            </tr>
            <tr v-for="p in products" :key="p.id">
                <td class="border p-2 text-center">{{ p.sku }}</td>
                <td class="border p-2 text-center">{{ p.name }}</td>
                <td class="border p-2 text-center">{{ p.quantity }}</td>
                <td class="border p-2 text-center">{{ formatRupiah(p.price) }}</td>
                <td class="border p-2 text-center justify-center">
                    <img v-if="p.barcode_url" :src="`${apiBase}${p.barcode_url}`" class="h-12 mx-auto" />
                </td>
                <td class="border p-2 text-center">{{ p.location }}</td>
                <td class="border p-2 text-center">
                    <span :class="p.status === 'active' ? 'text-green-500' : 'text-red-500'">
                        {{ p.status }}
                    </span>
                </td>
                <td class="border p-2 text-center">
                    <button @click="$emit('edit', p)" class="px-2 py-1 bg-yellow-300">Edit</button>
                    <button @click="$emit('delete', p)" class="px-2 py-1 bg-red-400">Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ['products', 'loading', 'formatRupiah', 'apiBase'],
    emits: ['edit', 'delete'],
};
</script>