import { get, post, put, deleteRequest } from '@/services/http'
import { levels } from './state'
import type { Level } from '@/domain/Level'

async function fetchLevels(): Promise<void> {
  if (levels?.value?.length > 0) {
    return
  }

  const level = await get<Level[]>('/level')

  setLevels(level)
}

function setLevels(newLevel: Level[]): void {
  levels.value = newLevel
}

function removeLevel(knowledgeId: number) {
  const response = deleteRequest(`/levels/${knowledgeId}`)
  levels.value = levels.value.filter((level) => level.id !== knowledgeId)
  return response
}

async function saveLevel(level: Level): Promise<void> {
  await post<Level[]>('/levels', level)
  levels.value.push(level)
}

async function editLevel(level: Level): Promise<void> {
  await put<Level[]>(`/levels/${level.id}`, level)
  levels.value = levels.value.map((item) => {
    if (item.id === level.id) {
      return level
    }
    return item
  })
}

export { fetchLevels, saveLevel, editLevel, setLevels, removeLevel }
