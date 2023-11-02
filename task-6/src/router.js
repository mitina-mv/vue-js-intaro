import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import AddView from './views/AddView.vue'
import EditView from './views/EditView.vue'
import ShowView from './views/ShowView.vue'

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
  {
    path: '/edit/:id',
    component: EditView,
    name: 'edit',
  },
  {
    path: '/:id',
    component: ShowView,
    name: 'show',
  }
],
  history: createWebHistory()
})