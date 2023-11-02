import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AddView from './views/AddView.vue'

export const router = createRouter({
  routes: [{
    path: '/',
    component: HomeView,
    name: 'home',
  },
  {
    path: '/add',
    component: AddView,
    name: 'add',
  },
//   {
//     path: '{id}/edit',
//     component: AddView,
//     name: 'add',
//   }
],
  history: createWebHistory()
})