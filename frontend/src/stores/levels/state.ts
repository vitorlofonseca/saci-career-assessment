import type { Level } from '@/domain/Level'

interface LevelState {
  levels: Level[]
  currentLevel: Level | null
  nextLevel: Level | null
}

const state: LevelState = {
  levels: [],
  currentLevel: null,
  nextLevel: null
}

export { state }
