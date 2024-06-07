import { computed } from 'vue'
import { levels } from '@/stores/levels/state'

const getLevels = computed(() => {
  return levels.value
})

export { getLevels }
