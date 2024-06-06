import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '@/views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import RoleView from '@/views/RoleView.vue'
import LevelView from '@/views/LevelView.vue'
import DeleteKnowledgeView from '@/views/DeleteKnowledgeView.vue'
import EditKnowledge from '@/views/EditKnowledgeView.vue'
import DeleteLevelView from '@/views/DeleteLevelView.vue'
import Viewlevelstable from '@/views/Viewlevelstable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
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
      path: '/role-view',
      component: RoleView
    },
    {
      path: '/level-view',
      component: LevelView
    },
    {
      path: '/level-table/:roleId',
      component: Viewlevelstable,
      props: (route) => ({
        roleId: Array.isArray(route.params.roleId) ? route.params.roleId[0] : route.params.roleId
      }) // Check if roleId is an array and access the first element if so
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
