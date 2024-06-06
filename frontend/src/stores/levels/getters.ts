import { computed } from 'vue'
import { levels } from '@/stores/levels/state'
import { roles } from '../roles/state'

const getLevel = computed(() => {
  return levels?.value
})

export { getLevel }
