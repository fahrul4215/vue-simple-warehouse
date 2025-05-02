<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div class="bg-white p-6 rounded w-full max-w-md">
            <h2 class="text-xl mb-4">{{ form.id ? 'Edit' : 'New' }} Product</h2>
            <form @submit.prevent="onSubmit" novalidate>
                <!-- SKU -->
                <div class="mb-4">
                    <label for="sku" class="block text-sm font-medium mb-1">SKU *</label>
                    <input id="sku" v-model="form.sku" required class="w-full p-2 border rounded"
                        :class="{ 'border-red-500': errorMessages.sku }" placeholder="SKU" autofocus />
                    <p v-if="errorMessages.sku" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.sku }}
                    </p>
                </div>

                <!-- Name -->
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium mb-1">Name *</label>
                    <input id="name" v-model="form.name" required class="w-full p-2 border rounded"
                        :class="{ 'border-red-500': errorMessages.name }" placeholder="Name" />
                    <p v-if="errorMessages.name" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.name }}
                    </p>
                </div>

                <!-- Price -->
                <div class="mb-4">
                    <label for="price" class="block text-sm font-medium mb-1">Price *</label>
                    <input id="price" v-model.number="form.price" type="number" min="0" required
                        class="w-full p-2 border rounded" :class="{ 'border-red-500': errorMessages.price }"
                        placeholder="Price" />
                    <p v-if="errorMessages.price" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.price }}
                    </p>
                </div>

                <!-- Quantity -->
                <div class="mb-4">
                    <label for="quantity" class="block text-sm font-medium mb-1">Quantity *</label>
                    <input id="quantity" v-model.number="form.quantity" type="number" min="0" required
                        class="w-full p-2 border rounded" :class="{ 'border-red-500': errorMessages.quantity }"
                        placeholder="Quantity" />
                    <p v-if="errorMessages.quantity" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.quantity }}
                    </p>
                </div>

                <!-- Location -->
                <div class="mb-4">
                    <label for="location" class="block text-sm font-medium mb-1">Location *</label>
                    <input id="location" v-model="form.location" required class="w-full p-2 border rounded"
                        :class="{ 'border-red-500': errorMessages.location }" placeholder="Location" />
                    <p v-if="errorMessages.location" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.location }}
                    </p>
                </div>

                <!-- Status -->
                <div class="mb-4">
                    <label for="status" class="block text-sm font-medium mb-1">Status *</label>
                    <select id="status" v-model="form.status" required class="w-full p-2 border rounded"
                        :class="{ 'border-red-500': errorMessages.status }">
                        <option value="" disabled>Select status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <p v-if="errorMessages.status" class="text-red-600 text-sm mt-1">
                        {{ errorMessages.status }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-2">
                    <button type="button" @click="$emit('close')" class="px-4 py-2">Cancel</button>
                    <button type="submit" class="px-4 py-2 bg-blue-600 text-white" :disabled="submitting">
                        {{ submitting ? 'Saving...' : 'Save' }}
                    </button>
                </div>

                <!-- General Error -->
                <p v-if="generalError" class="text-red-600 text-sm mt-4">
                    {{ generalError }}
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import { useProductsStore } from '../store/products';

// Accept the product as a prop from parent page
const props = defineProps({
    product: {
        type: Object,
        default: () => null
    }
});
const emit = defineEmits(['close', 'saved']);

// Access Pinia store for actions
const store = useProductsStore();

// Default empty shape
const emptyProduct = { id: null, sku: '', name: '', price: 0, quantity: 0, location: '', status: '' };

// Reactive form & errors
const form = reactive({ ...emptyProduct });
const errorMessages = reactive({ sku: '', name: '', price: '', quantity: '', location: '', status: '' });
const generalError = ref('');
const submitting = ref(false);

// Reset form when no product
function resetForm() {
    Object.assign(form, emptyProduct);
    clearErrors();
}

// Clear errors helper
function clearErrors() {
    generalError.value = '';
    Object.keys(errorMessages).forEach(key => (errorMessages[key] = ''));
}

// Watch for prop changes to populate or reset
watch(
    () => store.item,
    (p) => {
        if (p) {
            Object.assign(form, {
                id: p.id,
                sku: p.sku,
                name: p.name,
                price: p.price,
                quantity: p.quantity,
                location: p.location || '',
                status: p.status || ''
            });
        } else {
            resetForm();
        }
        clearErrors();
    },
    { immediate: true }
);

// Submission logic
async function onSubmit() {
    clearErrors();
    submitting.value = true;
    try {
        const data = {
            sku: form.sku,
            name: form.name,
            price: form.price,
            quantity: form.quantity,
            location: form.location,
            status: form.status,
        };
        if (form.id) {
            await store.update(form.id, data);
        } else {
            await store.create(data);
        }
        emit('saved');
    } catch (e) {
        const error = e.response?.data?.error;
        const details = e.response?.data?.details;
        if (details && typeof details === 'object') {
            Object.entries(details).forEach(([field, msg]) => {
                if (errorMessages[field] !== undefined) {
                    errorMessages[field] = msg;
                }
            });
        } else {
            generalError.value = error || (typeof details === 'string' ? details : 'An unexpected error occurred');
        }
    } finally {
        submitting.value = false;
    }
}
</script>

<style scoped>
/* Scoped styles if needed */
</style>