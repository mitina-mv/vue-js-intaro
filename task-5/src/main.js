import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import * as fas from '@fortawesome/free-solid-svg-icons';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

// Добавьте все иконки из fas в библиотеку
/* Object.keys(fas).forEach(iconName => {
    if(iconName == 'fas' || iconName == 'prefix') return;
    library.add(fas[iconName]);
  }); */

library.add(faUserSecret)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
