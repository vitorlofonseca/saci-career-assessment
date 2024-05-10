import { computed } from 'vue'
import { knowledges } from '@/stores/knowledges/state'

const getKnowledge = computed(() => {
  return knowledges?.value
})

export { getKnowledge }
