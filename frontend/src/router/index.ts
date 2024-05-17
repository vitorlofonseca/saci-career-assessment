import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '../views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import knowledgebutton from '@/views/knowledgebutton.vue'
import CreateRoleView from '@/views/CreateRoleView.vue'
import RoleView from '@/views/RoleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/create-role',
      component: CreateRoleView
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/',
      redirect: '/knowledgebutton'
    },
    {
      path: '/knowledgebutton',
      component: knowledgebutton
    },
    {
      path: '/knowledge-view',
      component: RoleView
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

          component: () => import('../views/DemoSection.vue')
        }
      ]
    }
  ]
})

export default router
