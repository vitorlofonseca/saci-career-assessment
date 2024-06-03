import { computed } from 'vue'
import { knowledges } from '@/stores/knowledges/state'
import { roles } from '../roles/state'

const getKnowledge = computed(() => {
  return knowledges?.value
})

export { getKnowledge }
