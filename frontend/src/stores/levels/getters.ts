import { computed } from 'vue'
import { levels } from './state'
import { get } from '@/services/http'
import type { Level } from '@/domain/Level'

const getLevels = computed(() => {
  return levels?.value
})

async function getLevelById(levelId: string) {
  return await get<Level>(`/levels/${levelId}`)
}
export { getLevels, getLevelById }
