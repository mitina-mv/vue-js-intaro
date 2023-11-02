import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/soho-light/theme.css'
import {store} from './store';
import {router} from './router'


createApp(App)
.use(PrimeVue)
.use(store)
.use(router)
.mount('#app')

