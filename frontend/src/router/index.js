import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PicnicsView from '../views/RidesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rides',
      name: 'rides',
      component: () => import('../views/RidesView.vue')
    },

    {
      path: '/rides/:id',
      name: 'ride',
      component: () => import('../views/RideView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

export default router
