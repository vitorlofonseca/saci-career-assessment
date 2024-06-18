import { get, post, put, deleteRequest } from '@/services/http'
import { levels } from './state'
import type { Level } from '@/domain/Level'

// Function to sort levels based on minCoefficient and maxCoefficient
function sortLevels(levels: Level[]): Level[] {
  return levels.slice().sort((a, b) => {
    return a.minCoefficient - b.minCoefficient || a.maxCoefficient - b.maxCoefficient
  })
}

async function fetchLevels(): Promise<void> {
  if (levels.value.length > 0) {
    return
  }

  const fetchedLevels = await get<Level[]>('/level')
  setLevels(fetchedLevels)
}

function setLevels(newLevels: Level[]): void {
  // Sort fetched levels before setting them
  levels.value = sortLevels(newLevels)
}

function removeLevel(levelId: number) {
  const response = deleteRequest(`/levels/${levelId}`)
  levels.value = levels.value.filter((level) => level.id !== levelId)
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

export { fetchLevels, saveLevel, editLevel, setLevels, removeLevel, sortLevels }
