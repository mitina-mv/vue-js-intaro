import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/soho-light/theme.css'

createApp(App)
.use(PrimeVue)
.mount('#app')

