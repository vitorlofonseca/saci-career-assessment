import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '@/views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import RoleView from '@/views/RoleView.vue'
import LevelView from '@/views/LevelView.vue'
import DeleteKnowledgeView from '@/views/DeleteKnowledgeView.vue'
import EditKnowledge from '@/views/EditKnowledgeView.vue'
import ViewLevelsTable from '@/views/ViewLevelsTable.vue'
import DeleteLevelView from '@/views/DeleteLevelView.vue'
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
      path: '/role/:id',
      name: 'RoleView',
      component: RoleView
    },
    {
      path: '/level-view/:id',
      name: 'LevelView',
      component: LevelView
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
