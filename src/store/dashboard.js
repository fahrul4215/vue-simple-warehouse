import { defineStore } from "pinia";
import * as api from "../services/dashboard";

export const useDashboardStore = defineStore("dashboard", {
    state: () => ({
        data: null,
        loading: false,
        error: null,
    }),
    actions: {
        async fetch() {
            this.loading = true;
            try {
                const res = await api.fetchDashboard();
                this.data = res.data;
                return res.data;
            } catch (e) {
                this.error = e;
            } finally {
                this.loading = false;
            }
        },
    },
});