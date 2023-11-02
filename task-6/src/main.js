import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import {store} from './store';
import {router} from './router'

import 'primeicons/primeicons.css'
import 'primevue/resources/themes/soho-light/theme.css'


createApp(App)
.use(PrimeVue)
.use(store)
.use(router)
.mount('#app')

