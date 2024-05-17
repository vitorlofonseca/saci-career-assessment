import { createRouter, createWebHistory } from 'vue-router'
import ReferencesSection from '../views/ReferencesSection.vue'
import PadawanView from '@/views/PadawanView.vue'
import HomeView from '@/views/HomeView.vue'
/* import DeleteViewTemp from '@/views/DeleteViewTemp.vue' */
import RoleView from '@/views/RoleView.vue'

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
    /* {
      path: '/delete',
      component: DeleteViewTemp
    },*/
    {
      path: '/role-view',
      component: RoleView
    },
    /* {
      path: '/delete',
      component: DeleteViewTemp
    },*/
    {
      path: '/padawan',
      component: PadawanView,
      children: [
        {
          path: '', // Aqui, path vazio corresponde à própria rota /padawan
          redirect: 'references' // Redirecionamento padrão para /padawan/references
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
