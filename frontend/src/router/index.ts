import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '@/views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
import knowledgebutton from '@/views/knowledgebutton.vue'
import DeleteKnowledgeView from '@/views/DeleteKnowledgeView.vue'

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
      path: '/',
      redirect: '/knowledgebutton'
    },
    {
      path: '/deleteknowledge',
      component: DeleteKnowledgeView
    },
    {
      path: '/knowledgebutton',
      component: knowledgebutton
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
