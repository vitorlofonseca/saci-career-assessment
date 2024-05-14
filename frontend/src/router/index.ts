import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '../views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateView from '@/views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/createrole',
      component: CreateView
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/padawan',
      name: 'padawan',
      component: PadawanView,
      children: [
        {
          path: 'references',
          component: ReferencesSection
        },
        {
          path: 'demo',
          // route level code-splitting
          // this generates a separate chunk (DemoView.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/DemoSection.vue')
        }
      ]
    }
  ]
})

export default router
