import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '@/views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import RoleView from '@/views/RoleView.vue'
import LevelView from '@/views/LevelView.vue'
import EditLevelView from '@/views/EditLevelView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: HomeView
    },
    {
      path: '/role/:roleId',
      name: 'RoleView',
      component: RoleView,
      children: [
        {
          path: 'level-view/:id',
          component: LevelView,
          name: 'Testa'
        },
        {
          path: 'level-view/create',
          component: LevelView
        }
      ]
    },
    {
      path: '/level-view',
      component: LevelView
    },

    {
      path: '/level-view/create',
      component: LevelView,
      name: 'CreateLevel'
    },
    {
      path: '/level-view/:id',
      component: LevelView,
      name: 'EditLevel'
    },

    {
      path: '/level-table',
      component: ViewLevelsTable
    },
    {
      path: '/level/:id',
      name: '/edit-level',
      component: EditLevelView
    },
    {
      path: '/deleteknowledge',
      component: DeleteKnowledgeView
    },
    {
      path: '/delete-level',
      component: DeleteLevelView
    },

    {
      path: '/padawan',
      component: PadawanView,
      children: [
        {
          path: '',
          redirect: 'references'
        },
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
