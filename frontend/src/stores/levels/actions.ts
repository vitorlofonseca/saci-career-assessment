import { post, get } from '@/services/http'
import { roles } from '../roles/state'
import type { Level } from '@/domain/Level'
import type { Role } from '@/domain/Role'
import type { QuizAnswer } from '@/domain/QuizAnswer'

async function getLevelsByRoleId(roleId: number): Promise<Level[] | undefined> {
  const role = roles.value.find((role) => role.id === roleId) || ({} as Role)

  if (!role.levels) {
    const sortedLevels = await get<Level[]>(`/levels/sorted/${roleId}`)
    role.levels = sortedLevels
  }
  return role.levels
}

async function getScoreResponse(
  roleId: number,
  answers: QuizAnswer[]
): Promise<{ currentLevel: Level; nextLevel: Level }> {
  return post<{ currentLevel: Level; nextLevel: Level }>('/quiz/evaluate-answers', {
    roleId,
    answers
  })
}

export { getLevelsByRoleId, getScoreResponse }
