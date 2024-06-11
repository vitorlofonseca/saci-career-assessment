import { computed } from 'vue'
import { levels } from './state'

export const getLevels = computed(() => levels.value)
