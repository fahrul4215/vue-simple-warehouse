import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { formatRupiah } from './utils/format'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

app.config.globalProperties.$formatRupiah = formatRupiah