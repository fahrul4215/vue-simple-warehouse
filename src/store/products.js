import { defineStore } from 'pinia';
import * as api from '../services/products';

export const useProductsStore = defineStore('products', {
    state: () => ({
        item: null,
        items: [],
        meta: { page: 1, page_size: 10, total: 10, total_pages: 1 },
        filters: { search: '', min_qty: null, status: '', sort_by: 'id', order: 'asc' },
        loading: false,
        error: null,
    }),
    actions: {
        async fetch() {
            this.loading = true;
            try {
                const res = await api.fetchProducts({
                    page: this.meta.page,
                    page_size: this.meta.page_size,
                    ...this.filters
                });
                this.items = res.data.data;
                this.meta = res.data.meta;
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
        },
        async get(id) {
            this.loading = true;
            try {
                const res = await api.getProduct(id);
                return res.data;
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
        },
        async create(data) {
            this.loading = true;
            try {
                const res = await api.createProduct(data);
                this.items.push(res.data);
                return res.data;
            } catch (e) {
                this.error = e;
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async update(id, data) {
            this.loading = true;
            try {
                const res = await api.updateProduct(id, data);
                const index = this.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.items[index] = res.data;
                }
                return res.data;
            } catch (e) {
                this.error = e;
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async delete(id) {
            this.loading = true;
            try {
                await api.deleteProduct(id);
                this.items = this.items.filter(item => item.id !== id);
            } catch (e) {
                this.error = e;
                throw e;
            } finally {
                this.loading = false;
            }
        },
        async exportCSV() {
            this.loading = true;
            try {
                const res = await api.exportProductsCSV({
                    ...this.filters,
                    page: this.meta.page,
                    page_size: this.meta.page_size,
                });
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'products.csv');
                document.body.appendChild(link);
                link.click();
            } catch (e) {
                this.error = e;
                throw e;
            } finally {
                this.loading = false;
            }
        },
        setItem(item) {
            this.item = item;
        },
        setFilters(filters) {
            this.filters = { ...this.filters, ...filters };
        },
        setPage(page) {
            this.meta.page = page;
        },
        setPageSize(page_size) {
            this.meta.page_size = page_size;
        },
        setTotal(total) {
            this.meta.total = total;
        },
        setTotalPages(total_pages) {
            this.meta.total_pages = total_pages;
        },
        setLoading(loading) {
            this.loading = loading;
        },
        setError(error) {
            this.error = error;
        },
        reset() {
            this.items = [];
            this.meta = { page: 1, page_size: 1, total: 10, total_pages: 1 };
            this.filters = { search: '', min_qty: null, status: '', sort_by: 'id', order: 'asc' };
            this.loading = false;
            this.error = null;
        },
        resetFilters() {
            this.filters = { search: '', min_qty: null, status: '', sort_by: 'id', order: 'asc' };
        },
        resetMeta() {
            this.meta = { page: 1, page_size: 1, total: 10, total_pages: 1 };
        },
        resetLoading() {
            this.loading = false;
        },
        resetError() {
            this.error = null;
        },
        resetAll() {
            this.reset();
            this.resetFilters();
            this.resetMeta();
            this.resetLoading();
            this.resetError();
        },
    },
});
