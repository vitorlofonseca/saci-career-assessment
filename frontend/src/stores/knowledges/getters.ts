import { computed } from 'vue'
import { knowledges } from '@/stores/knowledges/state'
import { roles } from '../roles/state'

const getKnowledge = computed(() => {
  return knowledges?.value
})

const getRoleById = (id: number) => roles.value.find((role) => id === role.id)

export { getKnowledge, getRoleById }
