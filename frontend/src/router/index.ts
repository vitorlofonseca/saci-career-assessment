import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '../views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import CreateRoleView from '@/views/CreateRoleView.vue'
import RoleView from '@/views/RoleView.vue'
import DeleteViewTemp from '@/views/DeleteViewTemp.vue'
import EditKnowledge from '@/views/EditKnowledge.vue'
import CreateView from '@/views/CreateView.vue'

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
      path: '/editknowledge',
      component: EditKnowledge
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/knowledge-view',
      component: RoleView
    },
    {
      path: '/delete',
      component: DeleteViewTemp
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
