<template>
    <nav class="flex items-center justify-center my-4" aria-label="Pagination">
        <ul class="inline-flex items-center -space-x-px">
            <!-- First Page -->
            <li>
                <button
                    class="px-3 py-2 ml-0 leading-tight bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 disabled:opacity-50"
                    :disabled="meta.page === 1" @click="changePage(1)">
                    «
                </button>
            </li>
            <!-- Previous Page -->
            <li>
                <button
                    class="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="meta.page === 1" @click="changePage(meta.page - 1)">
                    ‹
                </button>
            </li>
            <!-- Page Numbers -->
            <li v-for="page in pages" :key="page">
                <button v-if="page === '...'" class="px-3 py-2 bg-white border border-gray-300 cursor-default">
                    ...
                </button>
                <button v-else class="px-3 py-2 leading-tight border hover:bg-gray-100" :class="page === meta.page
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white border-gray-300 text-gray-700'
                    " @click="changePage(page)">
                    {{ page }}
                </button>
            </li>
            <!-- Next Page -->
            <li>
                <button
                    class="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                    :disabled="meta.page === meta.total_pages" @click="changePage(meta.page + 1)">
                    ›
                </button>
            </li>
            <!-- Last Page -->
            <li>
                <button
                    class="px-3 py-2 leading-tight bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 disabled:opacity-50"
                    :disabled="meta.page === meta.total_pages" @click="changePage(meta.total_pages)">
                    »
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from "vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
    meta: {
        type: Object,
        required: true,
        // expects { page, total_pages }
    },
});
const emit = defineEmits(["change-page"]);

function changePage(page) {
    if (page >= 1 && page <= props.meta.total_pages && page !== props.meta.page) {
        emit("change-page", page);
    }
}

// Compute pages array with ellipses
const pages = computed(() => {
    const total = props.meta.total_pages;
    const current = props.meta.page;
    const delta = 2; // pages around current
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i);
        }
    }

    for (const i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l > 2) {
                rangeWithDots.push("...");
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
